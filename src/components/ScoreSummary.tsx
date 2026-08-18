/**
 * Score header and breakdown.
 *
 * The percentage is stated numerically and repeated as an accessible bar; the
 * three outcome tiles always show their count and label, so a colour-blind or
 * monochrome reader gets the same information.
 */
import type { QuestionResult, QuizResults } from '../quiz/types';
import { formatDate, formatDuration, useI18n } from '../i18n';
import { ProgressBar, StatTile } from './primitives';

interface CategoryRow {
  category: string;
  correct: number;
  total: number;
}

function byCategory(results: readonly QuestionResult[]): CategoryRow[] {
  const rows = new Map<string, CategoryRow>();
  for (const result of results) {
    if (!result.category) continue;
    const row = rows.get(result.category) ?? { category: result.category, correct: 0, total: 0 };
    row.total += 1;
    if (result.isCorrect) row.correct += 1;
    rows.set(result.category, row);
  }
  return [...rows.values()].sort((a, b) => b.total - a.total || a.category.localeCompare(b.category));
}

export function ScoreSummary({ results }: { results: QuizResults }) {
  const { t, language } = useI18n();
  const { summary } = results;
  const categories = byCategory(results.results);

  return (
    <section className="score">
      <div className="score__headline">
        <div className="score__figure">
          <p className="score__label">{t('results.score')}</p>
          <p className="score__value">
            {summary.percentage}
            <span className="score__unit">%</span>
          </p>
          <p className="score__detail">
            {t('results.scoreDetail', { correct: summary.correct, total: summary.total })}
          </p>
        </div>

        <dl className="score__meta">
          <div>
            <dt>{t('results.date')}</dt>
            <dd>{formatDate(language, results.completedAt)}</dd>
          </div>
          <div>
            <dt>{t('results.language')}</dt>
            <dd>{t(`language.${results.language}`)}</dd>
          </div>
          <div>
            <dt>{t('results.duration')}</dt>
            <dd>{formatDuration(language, results.durationSeconds)}</dd>
          </div>
          <div>
            <dt>{t('results.total')}</dt>
            <dd>{summary.total}</dd>
          </div>
        </dl>
      </div>

      <ProgressBar value={summary.correct} max={summary.total} label={t('results.score')} />

      <div className="score__tiles">
        <StatTile label={t('results.correct')} value={summary.correct} tone="success" />
        <StatTile label={t('results.incorrect')} value={summary.incorrect} tone="danger" />
        <StatTile label={t('results.unanswered')} value={summary.unanswered} tone="warning" />
      </div>

      {categories.length > 1 ? (
        <details className="disclosure disclosure--inline">
          <summary className="disclosure__summary">
            <span className="disclosure__title">{t('results.byCategory')}</span>
          </summary>
          <div className="disclosure__content">
            <ul className="category-breakdown">
              {categories.map((row) => (
                <li key={row.category} className="category-breakdown__row">
                  <span className="category-breakdown__name">{row.category}</span>
                  <span className="category-breakdown__bar">
                    <ProgressBar value={row.correct} max={row.total} label={row.category} />
                  </span>
                  <span className="category-breakdown__count">
                    {row.correct}/{row.total}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </details>
      ) : null}
    </section>
  );
}
