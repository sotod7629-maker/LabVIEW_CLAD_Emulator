/**
 * Session persistence.
 *
 * Scope is deliberately narrow: the *in-progress* quiz is mirrored to
 * localStorage so an accidental reload does not destroy answers. Nothing else
 * is persisted — no history, no results archive — because nothing else was
 * asked for and storing graded work invites stale state.
 *
 * Writes are debounced and failures are swallowed: persistence is a
 * convenience, and a full or disabled storage must never break the quiz.
 */
import type { QuizSession } from './types';

const STORAGE_KEY = 'clad.activeSession';
const STORAGE_VERSION = 1;
/** Older drafts are not worth resuming. */
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

interface StoredSession {
  version: number;
  savedAt: string;
  session: QuizSession;
}

function storage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}

export function saveSession(session: QuizSession): void {
  const store = storage();
  if (!store) return;
  try {
    const payload: StoredSession = { version: STORAGE_VERSION, savedAt: new Date().toISOString(), session };
    store.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Quota exceeded or storage disabled — the quiz continues in memory.
  }
}

export function loadSession(): { session: QuizSession; savedAt: string } | null {
  const store = storage();
  if (!store) return null;
  try {
    const raw = store.getItem(STORAGE_KEY);
    if (!raw) return null;
    const payload = JSON.parse(raw) as StoredSession;
    if (payload.version !== STORAGE_VERSION || !payload.session?.items?.length) {
      clearSession();
      return null;
    }
    if (Date.now() - new Date(payload.savedAt).getTime() > MAX_AGE_MS) {
      clearSession();
      return null;
    }
    return { session: payload.session, savedAt: payload.savedAt };
  } catch {
    clearSession();
    return null;
  }
}

export function clearSession(): void {
  try {
    storage()?.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to do.
  }
}
