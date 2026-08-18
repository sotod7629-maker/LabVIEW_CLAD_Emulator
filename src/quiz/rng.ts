/**
 * Seeded pseudo-random number generator (mulberry32).
 *
 * A seeded generator (rather than `Math.random`) means a quiz can be
 * regenerated identically from its stored seed — which is what makes the
 * shuffle-preserves-correct-answer property testable, and what lets a restored
 * session rebuild the exact same paper.
 */
export type RandomSource = () => number;

export function createRng(seed: number): RandomSource {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Non-deterministic seed for a fresh session. */
export function randomSeed(): number {
  const cryptoApi = globalThis.crypto;
  if (cryptoApi?.getRandomValues) {
    return cryptoApi.getRandomValues(new Uint32Array(1))[0]!;
  }
  return Math.floor(Math.random() * 0xffffffff);
}

/** Fisher–Yates. Returns a new array; the input is not mutated. */
export function shuffle<T>(items: readonly T[], random: RandomSource): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const a = result[i]!;
    const b = result[j]!;
    result[i] = b;
    result[j] = a;
  }
  return result;
}

/** Draw `count` distinct items without replacement. */
export function sampleWithoutReplacement<T>(items: readonly T[], count: number, random: RandomSource): T[] {
  if (count >= items.length) return shuffle(items, random);
  return shuffle(items, random).slice(0, count);
}
