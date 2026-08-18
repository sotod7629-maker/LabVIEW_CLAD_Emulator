/**
 * Application shell and state machine (§24, §56).
 *
 * Holds the explicit application status and orchestrates the flow:
 *
 *   LOADING → READY → QUIZ_ACTIVE → GENERATING_EXPLANATIONS → RESULTS
 *
 * Domain logic lives in `src/lib`; this component coordinates, it does not
 * compute. Scoring, generation and retrieval are all called, never reimplemented.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { OptionKey } from './lib/data/schema';
import { loadQuestions, type LoadedBank } from './lib/data/loadQuestions';
import { measureCoverage } from './lib/data/translations';
import {
  generateQuiz,
  goToQuestion,
  QuizGenerationError,
  selectAnswer,
} from './lib/quiz/generateQuiz';
import { generateResults } from './lib/quiz/scoring';
import type {
  Language,
  QuizConfig,
  QuizResults,
  QuizSession,
  QuizStatus,
} from './lib/quiz/types';
import { createTranslator } from './lib/i18n';
import { createRetrievalProvider } from './lib/explain/retrievalProvider';
import { createBackendProvider } from './lib/explain/backendProvider';
import { createExplanationService } from './lib/explain/explanationService';
import type { Explanation, ExplanationRequest } from './lib/explain/types';
import {
  clearSession,
  loadLanguage,
  loadSession,
  saveLanguage,
  saveSession,
} from './lib/storage/session';
import { QuizSetup, type SetupValues } from './components/QuizSetup';
import { QuizView } from './components/QuizView';
import { ResultsView } from './components/ResultsView';
import { Modal } from './components/Modal';
import { Notice, ProgressBar, Spinner } from './components/primitives';

/**
 * Provider chain. The backend RAG service is listed first so it takes over
 * automatically if one is ever deployed, but it reports itself unavailable
 * unless VITE_EXPLANATION_API is configured, so today the local retrieval
 * provider always serves.
 */
const explanationService = createExplanationService({
  providers: [
    createBackendProvider(import.meta.env.VITE_EXPLANATION_API as string | undefined),
    createRetrievalProvider(),
  ],
  concurrency: 4,
});

export default function App() {
  const [status, setStatus] = useState<QuizStatus>('LOADING');
  const [bank, setBank] = useState<LoadedBank | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>(() => loadLanguage() ?? 'es');
  const [session, setSession] = useState<QuizSession | null>(null);
  const [results, setResults] = useState<QuizResults | null>(null);
  const [explanations, setExplanations] = useState<Map<number, Explanation>>(new Map());
  const [progress, setProgress] = useState({ completed: 0, total: 0 });
  const [notice, setNotice] = useState<string | null>(null);
  const [resumable, setResumable] = useState<QuizSession | null>(null);
  const [exitPrompt, setExitPrompt] = useState(false);

  const t = useMemo(() => createTranslator(language), [language]);
  const abortRef = useRef<AbortController | null>(null);

  // --- Bootstrap -----------------------------------------------------------
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const loaded = await loadQuestions();
        if (cancelled) return;
        setBank(loaded);
        setStatus('READY');
        const restored = loadSession();
        if (restored) setResumable(restored);
      } catch (error) {
        if (cancelled) return;
        setLoadError(error instanceof Error ? error.message : 'unknown');
        setStatus('ERROR');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Persist in-progress work so a reload does not lose answers (§33).
  useEffect(() => {
    if (session && status === 'QUIZ_ACTIVE') saveSession(session);
  }, [session, status]);

  const changeLanguage = useCallback((next: Language) => {
    setLanguage(next);
    saveLanguage(next);
  }, []);

  // --- Quiz lifecycle ------------------------------------------------------

  const startQuiz = useCallback(
    (config: Omit<QuizConfig, 'seed'>, pool = bank?.questions ?? []) => {
      if (!bank) return;
      setNotice(null);
      try {
        const { session: created, shortfall } = generateQuiz({
          questions: pool,
          config,
          translations: bank.translations,
        });
        if (shortfall) {
          setNotice(t('error.shortfall', { available: shortfall.available }));
        }
        setSession(created);
        setResults(null);
        setExplanations(new Map());
        setResumable(null);
        setStatus('QUIZ_ACTIVE');
        window.scrollTo({ top: 0 });
      } catch (error) {
        if (error instanceof QuizGenerationError) {
          setNotice(
            error.code === 'count-out-of-range'
              ? t('error.countRange')
              : t('error.noQuestionsForFilter'),
          );
        } else {
          setNotice(t('error.heading'));
        }
      }
    },
    [bank, t],
  );

  const handleStart = useCallback(
    (values: SetupValues) => {
      startQuiz({
        language,
        questionCount: values.questionCount,
        mode: values.mode,
        categories: values.categories,
        shuffleQuestions: values.shuffleQuestions,
        shuffleOptions: values.shuffleOptions,
      });
    },
    [language, startQuiz],
  );

  const finishQuiz = useCallback(
    async (active: QuizSession) => {
      const finished: QuizSession = {
        ...active,
        finishedAt: new Date().toISOString(),
        status: 'RESULTS',
      };
      const computed = generateResults(finished);
      setResults(computed);
      clearSession();

      setStatus('GENERATING_EXPLANATIONS');
      setProgress({ completed: 0, total: computed.results.length });
      window.scrollTo({ top: 0 });

      const controller = new AbortController();
      abortRef.current = controller;

      const requests: ExplanationRequest[] = computed.results.map((result) => ({
        questionId: result.questionId,
        question: result.question,
        correctAnswerText: result.correctAnswerText,
        selectedAnswerText: result.selectedAnswerText,
        bankSource: result.bankSource,
        language: computed.config.language,
      }));

      const produced = await explanationService.explainAll(
        requests,
        setProgress,
        controller.signal,
      );
      setExplanations(produced);
      setStatus('RESULTS');
    },
    [],
  );

  useEffect(() => () => abortRef.current?.abort(), []);

  const handleSelect = useCallback((questionId: number, optionId: OptionKey | null) => {
    setSession((current) => (current ? selectAnswer(current, questionId, optionId) : current));
  }, []);

  const handleNavigate = useCallback((index: number) => {
    setSession((current) => (current ? goToQuestion(current, index) : current));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const retryIncorrect = useCallback(() => {
    if (!results || !bank) return;
    const ids = new Set(results.results.filter((r) => !r.isCorrect).map((r) => r.questionId));
    const pool = bank.questions.filter((q) => ids.has(q.id));
    if (pool.length === 0) return;
    startQuiz({ ...results.config, questionCount: pool.length, categories: [] }, pool);
  }, [results, bank, startQuiz]);

  const goToSetup = useCallback(() => {
    setSession(null);
    setResults(null);
    setExplanations(new Map());
    clearSession();
    setStatus('READY');
    window.scrollTo({ top: 0 });
  }, []);

  const translationCoverage = useMemo(
    () =>
      bank
        ? measureCoverage(bank.questions, bank.translations)
        : { complete: 0, partial: 0, missing: 0 },
    [bank],
  );

  const quizName = bank?.metadata?.title ?? 'CLAD Quiz';

  // --- Render --------------------------------------------------------------

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        {t('app.skipToContent')}
      </a>

      <header className="app__header">
        <div className="app__header-inner">
          <div className="app__brand">
            <span className="app__title">{t('app.title')}</span>
            <span className="app__subtitle">{t('app.subtitle')}</span>
          </div>
          {status !== 'QUIZ_ACTIVE' && (
            <div className="segmented" role="radiogroup" aria-label={t('common.language')}>
              <button
                type="button"
                className="segmented__option"
                role="radio"
                aria-checked={language === 'es'}
                onClick={() => changeLanguage('es')}
              >
                ES
              </button>
              <button
                type="button"
                className="segmented__option"
                role="radio"
                aria-checked={language === 'en'}
                onClick={() => changeLanguage('en')}
              >
                EN
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="app__main" id="main">
        {status === 'LOADING' && (
          <div className="centered-state">
            <Spinner label={t('common.loading')} />
            <p className="score-panel__detail">{t('common.loading')}</p>
          </div>
        )}

        {status === 'ERROR' && (
          <div className="centered-state">
            <h1 className="processing__title">{t('error.heading')}</h1>
            <Notice tone="error">{t('error.bankInvalid')}</Notice>
            {loadError && (
              <p className="field__help" style={{ maxWidth: '32rem' }}>
                {loadError}
              </p>
            )}
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => window.location.reload()}
            >
              {t('common.retry')}
            </button>
          </div>
        )}

        {status === 'READY' && bank && (
          <>
            {notice && (
              <div style={{ marginBottom: 'var(--sp-4)' }}>
                <Notice tone="warning">{notice}</Notice>
              </div>
            )}
            <QuizSetup
              t={t}
              language={language}
              onLanguageChange={changeLanguage}
              categories={bank.categories}
              availableCount={bank.questions.length}
              translationCoverage={translationCoverage}
              docsUnavailable={false}
              validationSkipped={bank.issues.filter((i) => i.severity === 'error').length}
              resumable={
                resumable
                  ? {
                      answered: Object.values(resumable.answers).filter((a) => a != null).length,
                      total: resumable.questions.length,
                    }
                  : null
              }
              onResume={() => {
                if (!resumable) return;
                setSession(resumable);
                setLanguage(resumable.config.language);
                setResumable(null);
                setStatus('QUIZ_ACTIVE');
              }}
              onDiscardResume={() => {
                clearSession();
                setResumable(null);
              }}
              onStart={handleStart}
            />
          </>
        )}

        {status === 'QUIZ_ACTIVE' && session && (
          <QuizView
            session={session}
            t={t}
            onSelect={handleSelect}
            onNavigate={handleNavigate}
            onFinish={() => void finishQuiz(session)}
            onExit={() => setExitPrompt(true)}
          />
        )}

        {status === 'GENERATING_EXPLANATIONS' && (
          <div className="processing">
            <div>
              <h1 className="processing__title">{t('processing.title')}</h1>
              <p className="processing__status">{t('processing.explanations')}</p>
            </div>
            <div className="processing__bar">
              <ProgressBar
                value={progress.completed}
                max={progress.total}
                label={t('processing.explanations')}
              />
            </div>
            <p className="processing__status" aria-live="polite">
              {t('processing.progress', {
                done: progress.completed,
                total: progress.total,
              })}
            </p>
          </div>
        )}

        {status === 'RESULTS' && results && (
          <ResultsView
            results={results}
            explanations={explanations}
            quizName={quizName}
            t={t}
            onNewQuiz={goToSetup}
            onRetry={() => {
              if (!bank) return;
              // A fresh seed, so the retake is a genuinely new draw.
              startQuiz({ ...results.config, seed: undefined } as Omit<QuizConfig, 'seed'>);
            }}
            onRetryIncorrect={retryIncorrect}
          />
        )}

        {exitPrompt && (
          <Modal
            titleId="exit-quiz"
            title={t('quiz.exit')}
            onDismiss={() => setExitPrompt(false)}
            actions={
              <>
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => setExitPrompt(false)}
                >
                  {t('confirm.back')}
                </button>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => {
                    setExitPrompt(false);
                    goToSetup();
                  }}
                >
                  {t('quiz.exit')}
                </button>
              </>
            }
          >
            {t('quiz.exitConfirm')}
          </Modal>
        )}
      </main>
    </div>
  );
}
