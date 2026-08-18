/**
 * Active quiz.
 *
 * Only the current question is mounted — a 100-question paper renders one card,
 * not a hundred. Answers live in the session, so navigating away and back never
 * loses a selection.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { resolveText, type ContentLanguage } from '../data/types';
import type { QuizSession } from '../quiz/types';
import { unansweredQuestionIds } from '../quiz/generateQuiz';
import { useI18n } from '../i18n';
import { AnswerOption, positionLetter } from './AnswerOption';
import { QuestionNavigator } from './QuestionNavigator';
import { Badge, ProgressBar } from './primitives';

export function QuizScreen({
  session,
  primaryContentLanguage,
  onSelectAnswer,
  onClearAnswer,
  onToggleFlag,
  onNavigate,
  onRequestFinish,
  onAbandon,
}: {
  session: QuizSession;
  primaryContentLanguage: ContentLanguage;
  onSelectAnswer: (questionId: string, optionId: string) => void;
  onClearAnswer: (questionId: string) => void;
  onToggleFlag: (questionId: string) => void;
  onNavigate: (index: number) => void;
  onRequestFinish: () => void;
  onAbandon: () => void;
}) {
  const { t } = useI18n();
  const [navigatorOpen, setNavigatorOpen] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const item = session.items[session.currentIndex]!;
  const { question } = item;
  const total = session.items.length;
  const answeredCount = total - unansweredQuestionIds(session).length;
  const selectedOptionId = session.answers[question.id] ?? null;
  const isFlagged = session.flagged.includes(question.id);

  const prompt = useMemo(
    () => resolveText(question.prompt, session.config.contentLanguage, primaryContentLanguage),
    [question.prompt, session.config.contentLanguage, primaryContentLanguage],
  );

  // Move focus to the new question on navigation so keyboard and screen-reader
  // users land on the content rather than staying on the Next button.
  useEffect(() => {
    headingRef.current?.focus();
  }, [session.currentIndex]);

  const isLast = session.currentIndex === total - 1;

  return (
    <div className="quiz">
      <div className="quiz__status">
        <div className="quiz__status-text">
          <p className="quiz__counter">
            {t('quiz.progress', { current: session.currentIndex + 1, total })}
          </p>
          <p className="quiz__tally">
            <span>{t('quiz.answered', { count: answeredCount })}</span>
            <span aria-hidden="true"> · </span>
            <span>{t('quiz.remaining', { count: total - answeredCount })}</span>
          </p>
        </div>
        <button type="button" className="button button--ghost button--small" onClick={onAbandon}>
          {t('quiz.abandon')}
        </button>
      </div>

      <ProgressBar value={session.currentIndex + 1} max={total} label={t('quiz.progressLabel')} />

      <article className="question-card" key={question.id}>
        <div className="question-card__meta">
          {question.category ? <Badge tone="neutral">{question.category}</Badge> : null}
          {question.difficulty ? <Badge tone="neutral">{question.difficulty}</Badge> : null}
          <span className="question-card__id">{t('quiz.questionId', { id: question.id })}</span>
          {prompt.isFallback ? (
            <Badge tone="info" icon="i">
              {t('quiz.contentFallbackBadge')}
            </Badge>
          ) : null}
        </div>

        <h2 className="question-card__prompt" tabIndex={-1} ref={headingRef} lang={prompt.language}>
          {prompt.text}
        </h2>

        {prompt.isFallback ? <p className="question-card__note">{t('quiz.contentFallbackHint')}</p> : null}

        <fieldset className="question-card__options">
          <legend className="visually-hidden">{t('quiz.optionsLabel')}</legend>
          {item.displayOptions.map((option, index) => {
            const text = resolveText(option.text, session.config.contentLanguage, primaryContentLanguage);
            return (
              <AnswerOption
                key={option.id}
                name={`question-${question.id}`}
                optionId={option.id}
                letter={positionLetter(index)}
                text={text.text}
                selected={selectedOptionId === option.id}
                onSelect={(optionId) => onSelectAnswer(question.id, optionId)}
              />
            );
          })}
        </fieldset>

        <div className="question-card__tools">
          <button
            type="button"
            className={`button button--ghost button--small ${isFlagged ? 'is-active' : ''}`.trim()}
            aria-pressed={isFlagged}
            onClick={() => onToggleFlag(question.id)}
          >
            {isFlagged ? t('quiz.unflag') : t('quiz.flag')}
          </button>
          {selectedOptionId ? (
            <button
              type="button"
              className="button button--ghost button--small"
              onClick={() => onClearAnswer(question.id)}
            >
              {t('quiz.clearAnswer')}
            </button>
          ) : null}
        </div>
      </article>

      <div className="quiz__nav">
        <button
          type="button"
          className="button button--secondary"
          onClick={() => onNavigate(session.currentIndex - 1)}
          disabled={session.currentIndex === 0}
        >
          <span aria-hidden="true">←</span> {t('quiz.previous')}
        </button>

        <button
          type="button"
          className="button button--ghost quiz__nav-map"
          aria-expanded={navigatorOpen}
          onClick={() => setNavigatorOpen((open) => !open)}
        >
          {t('quiz.navigatorToggle')}
        </button>

        {isLast ? (
          <button type="button" className="button button--primary" onClick={onRequestFinish}>
            {t('quiz.finish')}
          </button>
        ) : (
          <button
            type="button"
            className="button button--primary"
            onClick={() => onNavigate(session.currentIndex + 1)}
          >
            {t('quiz.next')} <span aria-hidden="true">→</span>
          </button>
        )}
      </div>

      {navigatorOpen ? (
        <div className="quiz__navigator">
          <QuestionNavigator
            session={session}
            onNavigate={(index) => {
              onNavigate(index);
              setNavigatorOpen(false);
            }}
          />
          {!isLast ? (
            <button type="button" className="button button--secondary button--block" onClick={onRequestFinish}>
              {t('quiz.finish')}
            </button>
          ) : null}
        </div>
      ) : null}

      <p className="visually-hidden" aria-live="polite">
        {t('quiz.progress', { current: session.currentIndex + 1, total })}
      </p>
    </div>
  );
}
