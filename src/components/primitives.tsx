/**
 * Small presentational primitives shared across screens.
 * Kept together because each is a handful of lines and they are always used
 * as a set.
 */
import type { ReactNode } from 'react';

export type Tone = 'neutral' | 'info' | 'success' | 'danger' | 'warning';

/**
 * A short status marker. Always renders a text label — the icon and color are
 * redundant reinforcement, never the only signal.
 */
export function Badge({ tone = 'neutral', icon, children }: { tone?: Tone; icon?: string; children: ReactNode }) {
  return (
    <span className={`badge badge--${tone}`}>
      {icon ? (
        <span className="badge__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  );
}

/** A boxed message: validation summaries, notices, error explanations. */
export function Callout({
  tone = 'info',
  title,
  icon,
  children,
}: {
  tone?: Tone;
  title?: string;
  icon?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`callout callout--${tone}`} role={tone === 'danger' ? 'alert' : undefined}>
      {icon ? (
        <span className="callout__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <div className="callout__body">
        {title ? <p className="callout__title">{title}</p> : null}
        {children ? <div className="callout__content">{children}</div> : null}
      </div>
    </div>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`card ${className}`.trim()}>{children}</section>;
}

export function SectionHeading({
  title,
  description,
  actions,
  level = 2,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  level?: 2 | 3;
}) {
  const Tag = level === 2 ? 'h2' : 'h3';
  return (
    <header className="section-heading">
      <div className="section-heading__text">
        <Tag className="section-heading__title">{title}</Tag>
        {description ? <p className="section-heading__description">{description}</p> : null}
      </div>
      {actions ? <div className="section-heading__actions">{actions}</div> : null}
    </header>
  );
}

/** A labelled statistic. `emphasis` promotes one tile in a row without color alone. */
export function StatTile({
  label,
  value,
  detail,
  tone = 'neutral',
}: {
  label: string;
  value: ReactNode;
  detail?: string;
  tone?: Tone;
}) {
  return (
    <div className={`stat-tile stat-tile--${tone}`}>
      <p className="stat-tile__label">{label}</p>
      <p className="stat-tile__value">{value}</p>
      {detail ? <p className="stat-tile__detail">{detail}</p> : null}
    </div>
  );
}

export function ProgressBar({
  value,
  max,
  label,
  showTrack = true,
}: {
  value: number;
  max: number;
  label: string;
  showTrack?: boolean;
}) {
  const percentage = max === 0 ? 0 : Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      className={`progress ${showTrack ? '' : 'progress--bare'}`.trim()}
      role="progressbar"
      aria-valuenow={Math.round(percentage)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="progress__fill" style={{ width: `${percentage}%` }} />
    </div>
  );
}
