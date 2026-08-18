/**
 * Centralised translation contract (§9).
 *
 * `Dictionary` takes its KEYS from the Spanish dictionary but widens the values
 * to `string`. Adding a key to `es.ts` therefore makes TypeScript demand the
 * same key in `en.ts`: a missing UI string is a build error, not a
 * half-translated interface discovered at runtime.
 */

import type { es } from './es';

export type TranslationKey = keyof typeof es;
export type Dictionary = Record<TranslationKey, string>;
