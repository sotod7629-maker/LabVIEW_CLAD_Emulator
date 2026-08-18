/**
 * One collapsible result row.
 *
 * Collapsed by default: a 100-question review must open as a scannable list,
 * not a wall of a hundred explanations. The outcome is stated in words and a
 * symbol as well as color.
 */
import { useId } from 'react';
import type { Explanation } from '../explanations/types';
import type { QuestionResult } from '../quiz/types';
import { useI18n } from '../i18n';
import { AnswerOption, positionLetter } from './AnswerOption';
import { ExplanationPanel } from './ExplanationPanel';

const OUTCOME_SYMBOL: Record<QuestionResult['outcome'], string> = {
  correct: '✓',
  incorrect: '✗',
  unanswered: '–',
};

const OUTCOME_LABEL = {
  correct: 'results.correct',
  incorrect: 'results.incorrect',
  unanswered: 'results.unanswered',
} as const;

export function QuestionResultItem({
  result,
  explanation,
  expanded,
  onToggle,
}: {
  result: QuestionResult;
  explanation: Explanation | undefined;
  expanded: boolean;
  onToggle: (questionId: string) => void;
}) {
  const { t } = useI18n();
  const panelId = useId();

  return (
    <li className={`result-item result-item--${result.outcome} ${expanded ? 'is-expanded' : ''}`.trim()}>
      <h3 className="result-item__heading">
        <button
          type="button"
          className="result-item__toggle"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => onToggle(result.questionId)}
        >
          <span className={`result-item__symbol result-item__symbol--${result.outcome}`} aria-hidden="true">
            {OUTCOME_SYMBOL[result.outcome]}
          </span>
          <span className="result-item__text">
            <span className="result-item__label">
              {t('results.questionLabel', { number: result.displayIndex + 1 })}
              <span className="result-item__outcome">{t(OUTCOME_LABEL[result.outcome])}</span>
            </span>
            <span className="result-item__prompt">{result.questionText}</span>
          </span>
          <span className="result-item__chevron" aria-hidden="true">
            {expanded ? '▴' : '▾'}
          </span>
        </button>
      </h3>

      {/* The panel element always exists so `aria-controls` resolves, but its
          contents are mounted only while open — a 100-question review would
          otherwise build a hundred option lists and explanation trees. */}
      <div className="result-item__panel" id={panelId} hidden={!expanded}>
        {expanded ? (
          <>
        <div className="result-item__meta">
          <span>{t('quiz.questionId', { id: result.questionId })}</span>
          {result.category ? <span>{result.category}</span> : null}
          {result.difficulty ? <span>{result.difficulty}</span> : null}
        </div>

        <ul className="result-item__options">
          {result.options.map((option, index) => {
            const isCorrect = option.id === result.correctOptionId;
            const isSelected = option.id === result.selectedOptionId;
            return (
              <li key={option.id}>
                <AnswerOption
                  name={`result-${result.questionId}`}
                  optionId={option.id}
                  letter={positionLetter(index)}
                  text={option.text}
                  selected={isSelected}
                  state={isCorrect ? 'correct' : isSelected ? 'incorrect' : 'neutral'}
                  annotation={
                    isCorrect ? (
                      <span className="answer__tag answer__tag--correct">{t('results.correctAnswer')}</span>
                    ) : isSelected ? (
                      <span className="answer__tag answer__tag--incorrect">{t('results.yourAnswer')}</span>
                    ) : null
                  }
                />
              </li>
            );
          })}
        </ul>

        {!result.isAnswered ? <p className="result-item__unanswered">{t('results.noAnswer')}</p> : null}

        <div className="result-item__explanation">
          <h4 className="result-item__explanation-heading">{t('explanations.heading')}</h4>
          <ExplanationPanel explanation={explanation} />
        </div>
          </>
        ) : null}
      </div>
    </li>
  );
}
