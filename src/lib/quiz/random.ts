/**
 * Seeded pseudo-random number generation.
 *
 * A seeded generator (rather than Math.random) means a session is reproducible:
 * the same seed rebuilds the same quiz, which is what allows a persisted
 * session to be resumed exactly and a result set to be re-derived for export.
 *
 * mulberry32 — small, fast, well-distributed for this purpose. No cryptographic
 * claims are made or needed here.
 */

export type RandomFn = () => number;

export function createRandom(seed: number): RandomFn {
  let state = seed >>> 0;
  return function next(): number {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createSeed(): number {
  const buf = new Uint32Array(1);
  if (typeof globalThis.crypto?.getRandomValues === 'function') {
    globalThis.crypto.getRandomValues(buf);
    return buf[0]!;
  }
  return Math.floor(Math.random() * 0xffffffff);
}

/**
 * Fisher-Yates shuffle. Returns a new array; the input is not mutated.
 */
export function shuffle<T>(items: readonly T[], random: RandomFn): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const a = out[i]!;
    const b = out[j]!;
    out[i] = b;
    out[j] = a;
  }
  return out;
}

/** Random sample of `count` items without replacement. */
export function sample<T>(items: readonly T[], count: number, random: RandomFn): T[] {
  return shuffle(items, random).slice(0, Math.max(0, Math.min(count, items.length)));
}
