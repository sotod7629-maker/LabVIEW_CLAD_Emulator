/**
 * Results screen (§13, §14, §15, §41, §42).
 *
 * Every question is collapsed by default: with 100 questions an expanded list
 * would be unusable, and the point of this screen is to let a learner find
 * their mistakes fast.
 */

import { useMemo, useState } from 'react';
import type { Explanation } from '../lib/explain/types';
import type { QuestionResult, QuizResults } from '../lib/quiz/types';
import type { Translator } from '../lib/i18n';
import { ExplanationPanel } from './ExplanationPanel';
import { ExportPanel } from './ExportPanel';

type Filter = 'all' | 'correct' | 'incorrect' | 'unanswered';

function outcomeOf(result: QuestionResult): Exclude<Filter, 'all'> {
  if (!result.isAnswered) return 'unanswered';
  return result.isCorrect ? 'correct' : 'incorrect';
}

const STATUS_ICON: Record<Exclude<Filter, 'all'>, string> = {
  correct: '✓',
  incorrect: '✕',
  unanswered: '–',
};

function ResultItem({
  result,
  explanation,
  expanded,
  onToggle,
  t,
}: {
  result: QuestionResult;
  explanation: Explanation | undefined;
  expanded: boolean;
  onToggle: () => void;
  t: Translator;
}) {
  const outcome = outcomeOf(result);
  const panelId = `result-panel-${result.questionId}`;
  const statusLabel = t(
    outcome === 'correct'
      ? 'a11y.correct'
      : outcome === 'incorrect'
        ? 'a11y.incorrect'
        : 'a11y.unanswered',
  );

  return (
    <div className="result-item">
      <button
        type="button"
        className="result-item__summary"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span
          className={`result-item__status result-item__status--${outcome}`}
          aria-hidden="true"
        >
          {STATUS_ICON[outcome]}
        </span>
        <span className="result-item__title">
          <span className="result-item__index">
            {t('common.question')} {result.position} · {statusLabel}
          </span>
          <span className="result-item__prompt">{result.question}</span>
        </span>
        <span
          className={`result-item__chevron ${expanded ? 'result-item__chevron--open' : ''}`}
          aria-hidden="true"
        >
          ▸
        </span>
      </button>

      {expanded && (
        <div className="result-item__body" id={panelId}>
          <p className="result-item__question">{result.question}</p>

          <div
            className={`answer-row ${
              !result.isAnswered
                ? 'answer-row--none'
                : result.isCorrect
                  ? 'answer-row--correct'
                  : 'answer-row--incorrect'
            }`}
          >
            <span className="answer-row__label">{t('results.yourAnswer')}</span>
            <span className="answer-row__value">
              {result.selectedAnswerText ?? t('results.noAnswer')}
            </span>
          </div>

          {!result.isCorrect && (
            <div className="answer-row answer-row--correct">
              <span className="answer-row__label">{t('results.correctAnswer')}</span>
              <span className="answer-row__value">{result.correctAnswerText}</span>
            </div>
          )}

          <ExplanationPanel
            explanation={explanation}
            bankExplanation={result.bankExplanation}
            bankSource={result.bankSource}
            language={result.language}
            t={t}
          />
        </div>
      )}
    </div>
  );
}

export function ResultsView({
  results,
  explanations,
  quizName,
  t,
  onNewQuiz,
  onRetry,
  onRetryIncorrect,
}: {
  results: QuizResults;
  explanations: Map<number, Explanation>;
  quizName: string;
  t: Translator;
  onNewQuiz: () => void;
  onRetry: () => void;
  onRetryIncorrect: () => void;
}) {
  const [filter, setFilter] = useState<Filter>('all');
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const { summary } = results;

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? results.results
        : results.results.filter((r) => outcomeOf(r) === filter),
    [results.results, filter],
  );

  const toggle = (questionId: number) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: t('results.filterAll'), count: summary.total },
    { id: 'incorrect', label: t('results.filterIncorrect'), count: summary.incorrect },
    { id: 'unanswered', label: t('results.filterUnanswered'), count: summary.unanswered },
    { id: 'correct', label: t('results.filterCorrect'), count: summary.correct },
  ];

  const pct = (value: number) => (summary.total ? (value / summary.total) * 100 : 0);

  return (
    <section aria-labelledby="results-heading">
      <h1 className="visually-hidden" id="results-heading">
        {t('results.heading')}
      </h1>

      <div className="card score-panel">
        <div className="score-panel__label">{t('results.score')}</div>
        <div className="score-panel__value">{summary.percentage}%</div>
        <p className="score-panel__detail">
          {t('results.correctOf', { correct: summary.correct, total: summary.total })}
        </p>

        <div
          className="score-bar"
          role="img"
          aria-label={`${t('results.correct')}: ${summary.correct}, ${t(
            'results.incorrect',
          )}: ${summary.incorrect}, ${t('results.unanswered')}: ${summary.unanswered}`}
        >
          <div
            className="score-bar__segment score-bar__segment--correct"
            style={{ width: `${pct(summary.correct)}%` }}
          />
          <div
            className="score-bar__segment score-bar__segment--incorrect"
            style={{ width: `${pct(summary.incorrect)}%` }}
          />
          <div
            className="score-bar__segment score-bar__segment--unanswered"
            style={{ width: `${pct(summary.unanswered)}%` }}
          />
        </div>

        <div className="stat-grid">
          <div className="stat stat--correct">
            <span className="stat__icon" aria-hidden="true">
              ✓
            </span>
            <span>
              <span className="stat__value">{summary.correct}</span>
              <span className="stat__label" style={{ display: 'block' }}>
                {t('results.correct')}
              </span>
            </span>
          </div>
          <div className="stat stat--incorrect">
            <span className="stat__icon" aria-hidden="true">
              ✕
            </span>
            <span>
              <span className="stat__value">{summary.incorrect}</span>
              <span className="stat__label" style={{ display: 'block' }}>
                {t('results.incorrect')}
              </span>
            </span>
          </div>
          <div className="stat stat--unanswered">
            <span className="stat__icon" aria-hidden="true">
              –
            </span>
            <span>
              <span className="stat__value">{summary.unanswered}</span>
              <span className="stat__label" style={{ display: 'block' }}>
                {t('results.unanswered')}
              </span>
            </span>
          </div>
        </div>
      </div>

      <ExportPanel
        results={results}
        explanations={explanations}
        quizName={quizName}
        t={t}
      />

      <div className="results__toolbar">
        <div className="filter-group" role="group" aria-label={t('results.filterAll')}>
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              className="chip"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label} ({item.count})
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setExpanded(new Set(filtered.map((r) => r.questionId)))}
          >
            {t('results.expandAll')}
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setExpanded(new Set())}
          >
            {t('results.collapseAll')}
          </button>
        </div>
      </div>

      <div className="results__list">
        {filtered.length === 0 && <p className="field__help">{t('results.empty')}</p>}
        {filtered.map((result) => (
          <ResultItem
            key={result.questionId}
            result={result}
            explanation={explanations.get(result.questionId)}
            expanded={expanded.has(result.questionId)}
            onToggle={() => toggle(result.questionId)}
            t={t}
          />
        ))}
      </div>

      <div className="results__actions">
        <button type="button" className="btn btn--primary" onClick={onNewQuiz}>
          {t('results.newQuiz')}
        </button>
        <button type="button" className="btn btn--secondary" onClick={onRetry}>
          {t('results.retry')}
        </button>
        {summary.incorrect + summary.unanswered > 0 && (
          <button type="button" className="btn btn--secondary" onClick={onRetryIncorrect}>
            {t('results.retryIncorrect')}
          </button>
        )}
      </div>
    </section>
  );
}
