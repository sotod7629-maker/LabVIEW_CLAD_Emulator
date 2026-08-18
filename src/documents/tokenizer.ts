/**
 * Text normalization and tokenization for the document index.
 *
 * Deliberately light-weight: accent folding, stop-word removal and a very
 * conservative Spanish/English suffix stripper. No stemmer library — the corpus
 * is technical LabVIEW documentation where aggressive stemming does more harm
 * than good (e.g. "cases"/"case" is useful to conflate, "casing" is not).
 */

const SPANISH_STOP_WORDS = `a al algo algunas algunos ante antes como con contra cual cuando de del desde donde dos el ella
ellas ellos en entre era erais eran eres es esa esas ese eso esos esta estaba estas este esto estos ha hasta hay la las le
les lo los mas me mi mientras muy no nos o otra otras otro otros para pero poco por porque que quien se sea segun ser si sin
sobre solo son su sus tambien tanto te tiene tienen todo todos tras un una uno unos y ya`
  .split(/\s+/)
  .filter(Boolean);

const ENGLISH_STOP_WORDS = `a about above after again against all am an and any are as at be because been before being below
between both but by can cannot did do does doing down during each few for from further had has have having he her here hers
him his how i if in into is it its itself me more most my no nor not of off on once only or other our out over own same she
should so some such than that the their them then there these they this those through to too under until up very was we were
what when where which while who whom why with you your`
  .split(/\s+/)
  .filter(Boolean);

const STOP_WORDS = new Set([...SPANISH_STOP_WORDS, ...ENGLISH_STOP_WORDS]);

/** Lower-case and strip diacritics so "Lección" and "leccion" match. */
export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

const SPANISH_SUFFIXES = ['aciones', 'amiento', 'imiento', 'aremos', 'eremos', 'ciones', 'idades', 'mente', 'ando', 'endo'];

/** Conservative suffix stripping; only applied when a healthy stem remains. */
export function stem(token: string): string {
  if (token.length <= 4) return token;
  for (const suffix of SPANISH_SUFFIXES) {
    if (token.endsWith(suffix) && token.length - suffix.length >= 4) return token.slice(0, -suffix.length);
  }
  if (token.length > 5 && (token.endsWith('es') || token.endsWith('as') || token.endsWith('os'))) {
    return token.slice(0, -2);
  }
  if (token.length > 4 && token.endsWith('s') && !token.endsWith('ss')) return token.slice(0, -1);
  return token;
}

/**
 * Split into indexable terms. Keeps alphanumerics plus `.` and `-` inside
 * tokens so identifiers like "sub-VI" or "Core 1.2" survive.
 */
export function tokenize(text: string, options: { keepStopWords?: boolean } = {}): string[] {
  const normalized = normalizeText(text);
  const rawTokens = normalized.split(/[^a-z0-9.\-]+/).filter(Boolean);
  const tokens: string[] = [];
  for (const raw of rawTokens) {
    const token = raw.replace(/^[.\-]+|[.\-]+$/g, '');
    if (token.length < 2) continue;
    if (!options.keepStopWords && STOP_WORDS.has(token)) continue;
    tokens.push(stem(token));
  }
  return tokens;
}

/** Term frequencies for a document or a query. */
export function termFrequencies(tokens: readonly string[]): Map<string, number> {
  const frequencies = new Map<string, number>();
  for (const token of tokens) frequencies.set(token, (frequencies.get(token) ?? 0) + 1);
  return frequencies;
}

/**
 * Split text into sentences. Used to build short extracts rather than dumping
 * whole passages at the reader.
 */
export function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?¿?])\s+(?=[¿¡"'(A-ZÁÉÍÓÚÑ0-9])/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0);
}
