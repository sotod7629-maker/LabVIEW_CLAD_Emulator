/**
 * Active quiz screen (§10, §11, §30).
 *
 * Options are a real radiogroup: arrow keys move between them, Space/Enter
 * selects, and the whole group is a single tab stop — the behaviour keyboard
 * users expect from a set of mutually exclusive choices.
 */

import { useCallback, useMemo, useRef, useState } from 'react';
import type { OptionKey } from '../lib/data/schema';
import type { QuizSession } from '../lib/quiz/types';
import { countUnanswered } from '../lib/quiz/generateQuiz';
import type { Translator } from '../lib/i18n';
import { Modal } from './Modal';
import { Notice, ProgressBar } from './primitives';

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

export function QuizView({
  session,
  t,
  onSelect,
  onNavigate,
  onStep,
  onFinish,
  onExit,
}: {
  session: QuizSession;
  t: Translator;
  onSelect: (questionId: number, optionId: OptionKey | null) => void;
  /** Jump to an absolute index (question map). */
  onNavigate: (index: number) => void;
  /**
   * Move relative to whatever the CURRENT index is. Previous/Next must not
   * compute their target from the rendered index: a fast click can be handled
   * before React commits the preceding state update, and the stale index would
   * navigate back to a question already visited.
   */
  onStep: (delta: number) => void;
  onFinish: () => void;
  onExit: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const [navigatorOpen, setNavigatorOpen] = useState(false);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const question = session.questions[session.currentIndex];
  const total = session.questions.length;
  const answeredCount = total - countUnanswered(session);
  const unanswered = countUnanswered(session);
  const isLast = session.currentIndex === total - 1;
  const selectedId = question ? (session.answers[question.questionId] ?? null) : null;

  // In practice mode the outcome is revealed as soon as an answer is chosen.
  const revealed = session.config.mode === 'practice' && selectedId !== null;

  const selectedIndex = useMemo(
    () => (question ? question.options.findIndex((o) => o.id === selectedId) : -1),
    [question, selectedId],
  );

  const handleOptionKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      if (!question) return;
      const count = question.options.length;
      let next: number | null = null;

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          next = (index + 1) % count;
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          next = (index - 1 + count) % count;
          break;
        case 'Home':
          next = 0;
          break;
        case 'End':
          next = count - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      const option = question.options[next];
      if (option) {
        optionRefs.current[next]?.focus();
        if (!revealed) onSelect(question.questionId, option.id);
      }
    },
    [question, onSelect, revealed],
  );

  if (!question) return null;

  return (
    <section aria-labelledby="quiz-heading">
      <h1 className="visually-hidden" id="quiz-heading">
        {t('quiz.progress', { current: session.currentIndex + 1, total })}
      </h1>

      <div className="quiz__bar">
        <span className="quiz__position">
          {t('quiz.progress', { current: session.currentIndex + 1, total })}
        </span>
        <span className="quiz__position">
          {t('quiz.answeredCount', { answered: answeredCount, total })}
        </span>
      </div>
      <ProgressBar value={session.currentIndex + 1} max={total} label={t('quiz.progressLabel')} />

      <article className="card question-card">
        <div className="question-card__meta">
          <span className="tag">{question.category}</span>
          <span className="tag">{question.difficulty}</span>
          <span className="tag">ID {question.questionId}</span>
        </div>

        {question.translationFallback && (
          <div style={{ marginBottom: 'var(--sp-3)' }}>
            <Notice tone="info">{t('quiz.translationFallback')}</Notice>
          </div>
        )}

        <h2 className="question-card__prompt" id={`q-${question.questionId}`}>
          {question.prompt}
        </h2>
        <p className="question-card__hint">{t('quiz.optionHint')}</p>

        <div
          className="options"
          role="radiogroup"
          aria-labelledby={`q-${question.questionId}`}
        >
          {question.options.map((option, index) => {
            const isSelected = option.id === selectedId;
            const isCorrectOption = option.id === question.correctOptionId;
            const showCorrect = revealed && isCorrectOption;
            const showWrong = revealed && isSelected && !isCorrectOption;

            return (
              <button
                key={option.id}
                ref={(element) => {
                  // React clears this with null on unmount, so the array stays
                  // in sync as the question changes. Do NOT reset it from an
                  // effect: effects run after refs are attached and would wipe
                  // the entries that arrow-key navigation depends on.
                  optionRefs.current[index] = element;
                }}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={selectedIndex === -1 ? (index === 0 ? 0 : -1) : isSelected ? 0 : -1}
                disabled={revealed}
                className={[
                  'option',
                  showCorrect ? 'option--correct' : '',
                  showWrong ? 'option--wrong' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => {
                  if (revealed) return;
                  // Clicking the selected option again clears it, so a user can
                  // deliberately leave a question blank.
                  onSelect(question.questionId, isSelected ? null : option.id);
                }}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
              >
                <span className="option__marker" aria-hidden="true">
                  {OPTION_LABELS[index]}
                </span>
                <span className="option__text">{option.text}</span>
                {/* Outcome is never colour-only: a text badge accompanies it. */}
                {showCorrect && (
                  <span className="option__badge" style={{ color: 'var(--c-correct)' }}>
                    {t('quiz.practiceCorrect')}
                  </span>
                )}
                {showWrong && (
                  <span className="option__badge" style={{ color: 'var(--c-incorrect)' }}>
                    {t('quiz.practiceIncorrect')}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {selectedId && !revealed && (
          <button
            type="button"
            className="btn btn--ghost"
            style={{ marginTop: 'var(--sp-3)' }}
            onClick={() => onSelect(question.questionId, null)}
          >
            {t('quiz.clearAnswer')}
          </button>
        )}
      </article>

      <nav className="quiz__nav" aria-label={t('quiz.navigator')}>
        <button
          type="button"
          className="btn btn--secondary"
          disabled={session.currentIndex === 0}
          onClick={() => onStep(-1)}
        >
          ← {t('quiz.previous')}
        </button>
        <div className="quiz__nav-spacer" />
        {isLast ? (
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => setConfirming(true)}
          >
            {t('quiz.finish')}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => onStep(1)}
          >
            {t('quiz.next')} →
          </button>
        )}
      </nav>

      <div className="navigator">
        <details
          className="details"
          open={navigatorOpen}
          onToggle={(event) => setNavigatorOpen(event.currentTarget.open)}
        >
          <summary className="details__summary">{t('quiz.navigatorToggle')}</summary>
          <div className="details__body">
            <div className="navigator__grid">
              {session.questions.map((item, index) => {
                const answered = session.answers[item.questionId] != null;
                const current = index === session.currentIndex;
                return (
                  <button
                    key={item.questionId}
                    type="button"
                    className={[
                      'navigator__item',
                      answered ? 'navigator__item--answered' : '',
                      current ? 'navigator__item--current' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-current={current ? 'true' : undefined}
                    aria-label={`${t('common.question')} ${index + 1}: ${
                      answered ? t('quiz.answered') : t('quiz.unanswered')
                    }`}
                    onClick={() => onNavigate(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            <div className="navigator__legend">
              <span>
                <span className="navigator__swatch navigator__swatch--answered" aria-hidden="true" />
                {t('quiz.answered')}
              </span>
              <span>
                <span className="navigator__swatch" aria-hidden="true" />
                {t('quiz.unanswered')}
              </span>
            </div>
          </div>
        </details>
      </div>

      <div style={{ marginTop: 'var(--sp-4)', display: 'flex', gap: 'var(--sp-3)' }}>
        <button type="button" className="btn btn--ghost" onClick={onExit}>
          {t('quiz.exit')}
        </button>
        {!isLast && (
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => setConfirming(true)}
          >
            {t('quiz.finish')}
          </button>
        )}
      </div>

      {confirming && (
        <Modal
          titleId="confirm-finish"
          title={t('confirm.title')}
          onDismiss={() => setConfirming(false)}
          actions={
            <>
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => setConfirming(false)}
              >
                {t('confirm.back')}
              </button>
              <button type="button" className="btn btn--primary" onClick={onFinish}>
                {t('confirm.submit')}
              </button>
            </>
          }
        >
          {unanswered === 0
            ? t('confirm.allAnswered')
            : unanswered === 1
              ? t('confirm.unansweredOne')
              : t('confirm.unanswered', { count: unanswered })}
        </Modal>
      )}
    </section>
  );
}
