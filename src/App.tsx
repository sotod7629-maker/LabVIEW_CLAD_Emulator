/**
 * Application shell and flow orchestration.
 *
 * This component owns the state machine (`AppStatus`) and wires the layers
 * together; it contains no evaluation, parsing, retrieval or export logic —
 * those live in `quiz/`, `data/`, `documents/`, `explanations/` and `export/`.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  clearAnswer,
  generateQuiz,
  goToIndex,
  QuizGenerationError,
  resetSession,
  selectAnswer,
  toggleFlag,
  unansweredQuestionIds,
} from './quiz/generateQuiz';
import { buildQuizResults } from './quiz/scoring';
import { clearSession, loadSession, saveSession } from './quiz/persistence';
import type { AppStatus, QuizConfig, QuizResults, QuizSession } from './quiz/types';
import { ExplanationService } from './explanations/explanationService';
import { LocalDocumentProvider } from './explanations/localDocumentProvider';
import { RemoteRagProvider } from './explanations/remoteRagProvider';
import type { Explanation, ExplanationRequest } from './explanations/types';
import { useQuestionBank } from './hooks/useQuestionBank';
import { useReferenceDocuments } from './hooks/useReferenceDocuments';
import { formatDate, useI18n, type TranslationKey } from './i18n';
import { AppHeader, type Phase } from './components/AppHeader';
import { SetupScreen } from './components/SetupScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { ProcessingScreen } from './components/ProcessingScreen';
import { ErrorState } from './components/ErrorState';
import { Modal } from './components/Modal';

/**
 * Backend RAG endpoint. Unset in this deployment: there is no backend, so the
 * remote provider reports itself unavailable and the app falls back to local
 * retrieval rather than pretending a service is answering.
 */
const REMOTE_RAG_ENDPOINT = import.meta.env.VITE_RAG_ENDPOINT as string | undefined;

export default function App() {
  const { t, language } = useI18n();
  const bank = useQuestionBank();
  const documents = useReferenceDocuments();

  const [status, setStatus] = useState<AppStatus>('LOADING');
  const [session, setSession] = useState<QuizSession | null>(null);
  /** The paper just completed, kept so "retake" can re-serve exactly it. */
  const [completedSession, setCompletedSession] = useState<QuizSession | null>(null);
  const [results, setResults] = useState<QuizResults | null>(null);
  const [explanations, setExplanations] = useState<ReadonlyMap<string, Explanation>>(new Map());
  const [explanationProgress, setExplanationProgress] = useState({ done: 0, total: 0 });
  const [processingStage, setProcessingStage] = useState<'evaluating' | 'explanations'>('evaluating');
  const [confirmFinishOpen, setConfirmFinishOpen] = useState(false);
  const [confirmAbandonOpen, setConfirmAbandonOpen] = useState(false);
  const [resumeCandidate, setResumeCandidate] = useState<{ session: QuizSession; savedAt: string } | null>(null);
  const [quizError, setQuizError] = useState<TranslationKey | null>(null);

  const mainRef = useRef<HTMLElement>(null);

  // ---- Bank status feeds the top-level state machine -----------------------
  useEffect(() => {
    if (bank.status === 'loading' || bank.status === 'idle') setStatus('LOADING');
    else if (bank.status === 'error') setStatus('ERROR');
    else if (!session && !results) setStatus('READY');
  }, [bank.status, session, results]);

  // ---- Offer to resume an interrupted quiz --------------------------------
  useEffect(() => {
    if (bank.status !== 'ready') return;
    const stored = loadSession();
    if (stored) setResumeCandidate(stored);
  }, [bank.status]);

  // ---- Mirror the active session so a reload does not lose answers ---------
  useEffect(() => {
    if (session && status === 'QUIZ_ACTIVE') saveSession(session);
  }, [session, status]);

  const explanationService = useMemo(() => {
    const providers = [
      new RemoteRagProvider({ endpoint: REMOTE_RAG_ENDPOINT }),
      new LocalDocumentProvider(documents.index),
    ];
    return new ExplanationService({
      providers,
      corpusFingerprint: `${documents.corpusFingerprint}::${REMOTE_RAG_ENDPOINT ?? 'local'}`,
    });
  }, [documents.index, documents.corpusFingerprint]);

  const primaryContentLanguage = bank.bank?.metadata.primaryContentLanguage ?? 'es';

  const startQuiz = useCallback(
    (partialConfig: Omit<QuizConfig, 'uiLanguage' | 'contentLanguage'>) => {
      if (!bank.bank) return;
      const config: QuizConfig = { ...partialConfig, uiLanguage: language, contentLanguage: language };
      try {
        const created = generateQuiz({ questions: bank.bank.questions, config });
        created.bankTitle = bank.bank.metadata.title ?? t('app.title');
        setQuizError(null);
        setResults(null);
        setExplanations(new Map());
        setSession(created);
        setStatus('QUIZ_ACTIVE');
        setResumeCandidate(null);
      } catch (error) {
        const code = error instanceof QuizGenerationError ? error.code : 'no-questions-available';
        setQuizError(`error.quiz.${code}` as TranslationKey);
      }
    },
    [bank.bank, language, t],
  );

  const finishQuiz = useCallback(async () => {
    if (!session) return;
    setConfirmFinishOpen(false);
    setProcessingStage('evaluating');
    setStatus('SUBMITTING');

    const graded = buildQuizResults(session, primaryContentLanguage);
    setResults(graded);
    clearSession();

    const requests: ExplanationRequest[] = graded.results.map((result) => ({
      questionId: result.questionId,
      language: graded.language,
      questionText: result.questionText,
      correctOptionText: result.correctOptionText,
      selectedOptionText: result.selectedOptionText,
      isCorrect: result.isCorrect,
      category: result.category,
      bankExplanation: result.bankExplanation,
      bankSourceLabel: result.bankSourceLabel,
    }));

    setProcessingStage('explanations');
    setExplanationProgress({ done: 0, total: requests.length });
    setStatus('GENERATING_EXPLANATIONS');

    const produced = await explanationService.explainAll(requests, (done, total) =>
      setExplanationProgress({ done, total }),
    );

    setExplanations(produced);
    setCompletedSession(session);
    setSession(null);
    setStatus('RESULTS');
  }, [session, primaryContentLanguage, explanationService]);

  const requestFinish = useCallback(() => {
    if (!session) return;
    // Never submit silently past unanswered questions.
    if (unansweredQuestionIds(session).length > 0) setConfirmFinishOpen(true);
    else void finishQuiz();
  }, [session, finishQuiz]);

  const abandonQuiz = useCallback(() => {
    setConfirmAbandonOpen(false);
    clearSession();
    setSession(null);
    setResults(null);
    setCompletedSession(null);
    setExplanations(new Map());
    setStatus('READY');
  }, []);

  /** Re-serve the same paper — same questions, same option order — unanswered. */
  const retake = useCallback(() => {
    if (!completedSession) return;
    setResults(null);
    setExplanations(new Map());
    setSession(resetSession(completedSession));
    setStatus('QUIZ_ACTIVE');
  }, [completedSession]);

  const startNewQuiz = useCallback(() => {
    setResults(null);
    setExplanations(new Map());
    setCompletedSession(null);
    setStatus('READY');
  }, []);

  const phase: Phase =
    status === 'QUIZ_ACTIVE' || status === 'SUBMITTING' || status === 'GENERATING_EXPLANATIONS'
      ? 'quiz'
      : status === 'RESULTS'
        ? 'results'
        : 'setup';

  // Move focus to the main region on phase changes so keyboard users follow the flow.
  useEffect(() => {
    mainRef.current?.focus();
  }, [phase]);

  const unansweredCount = session ? unansweredQuestionIds(session).length : 0;

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        {t('app.skipToContent')}
      </a>
      <AppHeader phase={phase} />

      <main className="app__main" id="main" ref={mainRef} tabIndex={-1}>
        <div className="app__container">
          {status === 'LOADING' ? <p className="app__loading">{t('bank.loading')}</p> : null}

          {status === 'ERROR' && bank.errorCode ? (
            <ErrorState message={t(`error.bank.${bank.errorCode}` as TranslationKey)} onRetry={bank.loadBundled} />
          ) : null}

          {status === 'READY' && bank.bank ? (
            <>
              {quizError ? <ErrorState message={t(quizError, { min: 1, max: 100 })} /> : null}
              <SetupScreen
                bank={bank.bank}
                report={bank.report}
                bankLabel={bank.source.kind === 'file' ? bank.source.label : ''}
                onLoadBankFile={(file) => void bank.loadFromFile(file)}
                onResetBank={() => void bank.loadBundled()}
                documents={documents.documents}
                chunkCount={documents.index.chunkCount}
                totalPages={documents.totalPages}
                documentProgress={documents.progress}
                documentFailures={documents.failures}
                maxDocumentBytes={documents.maxBytes}
                onAddDocuments={(files) => void documents.addFiles(files)}
                onRemoveDocument={documents.removeDocument}
                onStart={startQuiz}
              />
            </>
          ) : null}

          {status === 'QUIZ_ACTIVE' && session ? (
            <QuizScreen
              session={session}
              primaryContentLanguage={primaryContentLanguage}
              onSelectAnswer={(questionId, optionId) =>
                setSession((current) => (current ? selectAnswer(current, questionId, optionId) : current))
              }
              onClearAnswer={(questionId) =>
                setSession((current) => (current ? clearAnswer(current, questionId) : current))
              }
              onToggleFlag={(questionId) =>
                setSession((current) => (current ? toggleFlag(current, questionId) : current))
              }
              onNavigate={(index) => setSession((current) => (current ? goToIndex(current, index) : current))}
              onRequestFinish={requestFinish}
              onAbandon={() => setConfirmAbandonOpen(true)}
            />
          ) : null}

          {status === 'SUBMITTING' || status === 'GENERATING_EXPLANATIONS' ? (
            <ProcessingScreen
              stage={processingStage}
              done={explanationProgress.done}
              total={explanationProgress.total}
            />
          ) : null}

          {status === 'RESULTS' && results ? (
            <ResultsScreen
              results={results}
              explanations={explanations}
              onRetake={retake}
              onNewQuiz={startNewQuiz}
            />
          ) : null}
        </div>
      </main>

      <Modal
        open={confirmFinishOpen}
        onClose={() => setConfirmFinishOpen(false)}
        title={t('confirm.heading')}
        footer={
          <>
            <button
              type="button"
              className="button button--secondary"
              onClick={() => {
                setConfirmFinishOpen(false);
                setSession((current) => {
                  if (!current) return current;
                  const firstUnanswered = current.items.findIndex((item) => !current.answers[item.questionId]);
                  return firstUnanswered >= 0 ? goToIndex(current, firstUnanswered) : current;
                });
              }}
            >
              {t('confirm.reviewUnanswered')}
            </button>
            <button type="button" className="button button--primary" onClick={() => void finishQuiz()}>
              {t('confirm.submit')}
            </button>
          </>
        }
      >
        <p>{t('confirm.unanswered', { count: unansweredCount })}</p>
      </Modal>

      <Modal
        open={confirmAbandonOpen}
        onClose={() => setConfirmAbandonOpen(false)}
        title={t('quiz.abandon')}
        footer={
          <>
            <button
              type="button"
              className="button button--secondary"
              onClick={() => setConfirmAbandonOpen(false)}
            >
              {t('confirm.cancel')}
            </button>
            <button type="button" className="button button--primary" onClick={abandonQuiz}>
              {t('common.continue')}
            </button>
          </>
        }
      >
        <p>{t('quiz.abandonConfirm')}</p>
      </Modal>

      <Modal
        open={resumeCandidate !== null && status === 'READY'}
        onClose={() => {
          clearSession();
          setResumeCandidate(null);
        }}
        title={t('resume.heading')}
        footer={
          <>
            <button
              type="button"
              className="button button--secondary"
              onClick={() => {
                clearSession();
                setResumeCandidate(null);
              }}
            >
              {t('resume.discard')}
            </button>
            <button
              type="button"
              className="button button--primary"
              onClick={() => {
                if (!resumeCandidate) return;
                setSession(resumeCandidate.session);
                setStatus('QUIZ_ACTIVE');
                setResumeCandidate(null);
              }}
            >
              {t('resume.confirm')}
            </button>
          </>
        }
      >
        {resumeCandidate ? (
          <p>
            {t('resume.body', {
              date: formatDate(language, resumeCandidate.savedAt),
              answered: Object.keys(resumeCandidate.session.answers).length,
              total: resumeCandidate.session.items.length,
            })}
          </p>
        ) : null}
      </Modal>
    </div>
  );
}
