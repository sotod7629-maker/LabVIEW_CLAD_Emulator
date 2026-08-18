/**
 * Question map: answered / unanswered / flagged / current at a glance.
 * State is conveyed by a symbol and an accessible name, not by color alone.
 */
import type { QuizSession } from '../quiz/types';
import { useI18n } from '../i18n';

export function QuestionNavigator({
  session,
  onNavigate,
}: {
  session: QuizSession;
  onNavigate: (index: number) => void;
}) {
  const { t } = useI18n();

  return (
    <nav className="navigator" aria-label={t('quiz.navigator')}>
      <ol className="navigator__grid">
        {session.items.map((item, index) => {
          const answered = Boolean(session.answers[item.questionId]);
          const flagged = session.flagged.includes(item.questionId);
          const current = index === session.currentIndex;
          const state = t(current ? 'quiz.state.current' : answered ? 'quiz.state.answered' : 'quiz.state.unanswered');

          return (
            <li key={item.questionId}>
              <button
                type="button"
                className={[
                  'navigator__item',
                  answered ? 'is-answered' : 'is-unanswered',
                  current ? 'is-current' : '',
                  flagged ? 'is-flagged' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-current={current ? 'true' : undefined}
                aria-label={t('quiz.navigatorItem', { number: index + 1, state })}
                onClick={() => onNavigate(index)}
              >
                <span className="navigator__number">{index + 1}</span>
                <span className="navigator__state" aria-hidden="true">
                  {answered ? '✓' : '·'}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
