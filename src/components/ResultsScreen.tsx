/**
 * Results and review.
 *
 * Filters and per-question collapse keep a 100-question review usable; the
 * default view is a scannable list with everything collapsed.
 */
import { useMemo, useState } from 'react';
import type { Explanation } from '../explanations/types';
import type { QuestionResult, QuizResults } from '../quiz/types';
import { useI18n } from '../i18n';
import { QuestionResultItem } from './QuestionResultItem';
import { ScoreSummary } from './ScoreSummary';
import { ExportPanel } from './ExportPanel';
import { Card, SectionHeading } from './primitives';

type ResultFilter = 'all' | 'correct' | 'incorrect' | 'unanswered';

const FILTERS: ResultFilter[] = ['all', 'incorrect', 'unanswered', 'correct'];

function matchesFilter(result: QuestionResult, filter: ResultFilter): boolean {
  return filter === 'all' || result.outcome === filter;
}

export function ResultsScreen({
  results,
  explanations,
  onRetake,
  onNewQuiz,
}: {
  results: QuizResults;
  explanations: ReadonlyMap<string, Explanation>;
  onRetake: () => void;
  onNewQuiz: () => void;
}) {
  const { t } = useI18n();
  // Incorrect answers are what people came to read, so open on that view when
  // there are any.
  const [filter, setFilter] = useState<ResultFilter>(results.summary.incorrect > 0 ? 'incorrect' : 'all');
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(new Set());

  const visible = useMemo(
    () => results.results.filter((result) => matchesFilter(result, filter)),
    [results.results, filter],
  );

  const toggle = (questionId: string) => {
    setExpanded((previous) => {
      const next = new Set(previous);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  const allExpanded = visible.length > 0 && visible.every((result) => expanded.has(result.questionId));

  return (
    <div className="results">
      <h1 className="results__title">{t('results.heading')}</h1>

      <Card>
        <ScoreSummary results={results} />
      </Card>

      <Card>
        <ExportPanel results={results} explanations={explanations} />
      </Card>

      <Card>
        <SectionHeading
          title={t('results.review')}
          description={t('results.showing', { count: visible.length, total: results.summary.total })}
          actions={
            <button
              type="button"
              className="button button--ghost button--small"
              onClick={() =>
                setExpanded(allExpanded ? new Set() : new Set(visible.map((result) => result.questionId)))
              }
              disabled={visible.length === 0}
            >
              {allExpanded ? t('results.collapseAll') : t('results.expandAll')}
            </button>
          }
        />

        <div className="segmented segmented--wrap" role="radiogroup" aria-label={t('results.filterLabel')}>
          {FILTERS.map((option) => {
            const count =
              option === 'all'
                ? results.summary.total
                : option === 'correct'
                  ? results.summary.correct
                  : option === 'incorrect'
                    ? results.summary.incorrect
                    : results.summary.unanswered;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={filter === option}
                className={`segmented__option ${filter === option ? 'is-selected' : ''}`.trim()}
                onClick={() => setFilter(option)}
              >
                {t(`results.filter.${option}`)}
                <span className="segmented__count">{count}</span>
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <p className="results__empty">{t('results.empty')}</p>
        ) : (
          <ul className="result-list">
            {visible.map((result) => (
              <QuestionResultItem
                key={result.questionId}
                result={result}
                explanation={explanations.get(result.questionId)}
                expanded={expanded.has(result.questionId)}
                onToggle={toggle}
              />
            ))}
          </ul>
        )}
      </Card>

      <div className="results__actions">
        <button type="button" className="button button--secondary" onClick={onRetake}>
          {t('results.retake')}
        </button>
        <button type="button" className="button button--primary" onClick={onNewQuiz}>
          {t('results.newQuiz')}
        </button>
      </div>
    </div>
  );
}
