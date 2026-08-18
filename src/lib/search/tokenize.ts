/**
 * Tokenisation shared with the build-time indexer (`scripts/build-doc-index.mjs`).
 *
 * These two implementations MUST stay in lockstep: the index is built with one
 * and queried with the other, so any divergence silently degrades recall.
 * The rules are intentionally simple — lowercase, strip diacritics, split on
 * non-alphanumerics, drop stopwords and very short tokens.
 */

const STOPWORDS = new Set(
  (
    'a an the of to in on for with and or is are be as at by from that this these those it its you your ' +
    'can will use used using when if then than each into over under more most other such no not only own ' +
    'same so also new i ii iii iv v vi you have has had do does did but they them their there here what ' +
    'which who whom how why all any both few nor too very s t just should now'
  ).split(/\s+/),
);

/** Spanish stopwords, applied to the query side before term bridging. */
const STOPWORDS_ES = new Set(
  (
    'el la los las un una unos unas de del al a en y o u que se su sus por para con sin sobre entre es son ' +
    'ser está están cual cuales cuál cuáles qué cómo como cuando cuándo donde dónde porque cuyo lo le les ' +
    'si no ni más menos muy también pero e desde hasta durante ante bajo tras siguiente siguientes cada ' +
    'siguiente mismo misma mismos mismas otro otra otros otras todo toda todos todas puede pueden debe deben ' +
    'hace hacen tiene tienen usa usan usando utiliza utilizan utilizando siguiente cuál'
  ).split(/\s+/),
);

/**
 * True for words the index deliberately omits (English stopwords).
 *
 * Their absence from the index carries no information, so they must never be
 * treated as evidence that a topic is undocumented.
 */
export function isIndexStopword(token: string): boolean {
  return STOPWORDS.has(token);
}

export function stripDiacritics(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/** Tokenise document text. Mirrors the indexer exactly. */
export function tokenize(text: string): string[] {
  return stripDiacritics(text.toLowerCase())
    .replace(/[^a-z0-9]+/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= 2 && t.length <= 32 && !STOPWORDS.has(t));
}

/** Tokenise a Spanish or English query, dropping stopwords from both languages. */
export function tokenizeQuery(text: string): string[] {
  return stripDiacritics(text.toLowerCase())
    .replace(/[^a-z0-9]+/g, ' ')
    .split(/\s+/)
    .filter(
      (t) => t.length >= 2 && t.length <= 32 && !STOPWORDS.has(t) && !STOPWORDS_ES.has(t),
    );
}
