/**
 * Session persistence (§33, §58).
 *
 * Scope is deliberately narrow: enough that an accidental reload does not
 * destroy an in-progress attempt, and that the language choice survives between
 * visits. No history, no permanent record — those are not required, and storing
 * them would be state the user never asked us to keep.
 *
 * All access is defensive: storage can be unavailable (private mode, disabled
 * cookies) or hold data written by an older version. A failure to read or write
 * must never break the quiz.
 */

import type { Language, QuizSession } from '../quiz/types';

const SESSION_KEY = 'clad.session.v1';
const LANGUAGE_KEY = 'clad.language.v1';

/** Persisted sessions older than this are ignored as stale. */
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

interface PersistedSession {
  version: 1;
  savedAt: string;
  session: QuizSession;
}

function safeStorage(): Storage | null {
  try {
    const storage = globalThis.localStorage;
    // Probe: Safari private mode throws only on write.
    const probe = '__clad_probe__';
    storage.setItem(probe, '1');
    storage.removeItem(probe);
    return storage;
  } catch {
    return null;
  }
}

export function saveSession(session: QuizSession): void {
  const storage = safeStorage();
  if (!storage) return;
  try {
    const payload: PersistedSession = {
      version: 1,
      savedAt: new Date().toISOString(),
      session,
    };
    storage.setItem(SESSION_KEY, JSON.stringify(payload));
  } catch {
    // Quota exceeded or serialisation failure — persistence is best-effort.
  }
}

export function loadSession(): QuizSession | null {
  const storage = safeStorage();
  if (!storage) return null;
  try {
    const raw = storage.getItem(SESSION_KEY);
    if (!raw) return null;

    const payload = JSON.parse(raw) as Partial<PersistedSession>;
    if (payload.version !== 1 || !payload.session || !payload.savedAt) return null;

    const age = Date.now() - Date.parse(payload.savedAt);
    if (!Number.isFinite(age) || age > MAX_AGE_MS) {
      clearSession();
      return null;
    }

    const session = payload.session;
    // Shape check: a session from an incompatible build must not be restored
    // into the running one.
    if (
      typeof session.id !== 'string' ||
      !Array.isArray(session.questions) ||
      session.questions.length === 0 ||
      typeof session.answers !== 'object' ||
      session.answers === null
    ) {
      clearSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  try {
    safeStorage()?.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

export function saveLanguage(language: Language): void {
  try {
    safeStorage()?.setItem(LANGUAGE_KEY, language);
  } catch {
    /* ignore */
  }
}

export function loadLanguage(): Language | null {
  try {
    const value = safeStorage()?.getItem(LANGUAGE_KEY);
    return value === 'es' || value === 'en' ? value : null;
  } catch {
    return null;
  }
}
