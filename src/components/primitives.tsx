/**
 * Small shared presentational primitives.
 */

import type { ReactNode } from 'react';

export function ProgressBar({
  value,
  max,
  label,
}: {
  value: number;
  max: number;
  label: string;
}) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  return (
    <div
      className="progress"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
    >
      <div className="progress__fill" style={{ width: `${percent}%` }} />
    </div>
  );
}

export type NoticeTone = 'info' | 'warning' | 'error';

const NOTICE_ICON: Record<NoticeTone, string> = {
  info: 'i',
  warning: '!',
  error: '×',
};

export function Notice({
  tone = 'info',
  title,
  children,
}: {
  tone?: NoticeTone;
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className={`notice notice--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      <span className="notice__icon" aria-hidden="true">
        {NOTICE_ICON[tone]}
      </span>
      <div className="notice__body">
        {title && <div className="notice__title">{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
}

export function Spinner({ label }: { label: string }) {
  return (
    <>
      <div className="spinner" aria-hidden="true" />
      <span className="visually-hidden">{label}</span>
    </>
  );
}
