/**
 * The only module that knows about the on-disk JSON schema.
 *
 * Detected schema of the bundled bank (`public/data/cuestionario_CLAD_300.json`):
 *
 *   {
 *     "metadata":   { "title", "total_questions", "generated_from"[], "version" },
 *     "categories": string[],
 *     "questions":  [{
 *       "id":             number,          // 1..300, unique
 *       "category":       string,
 *       "difficulty":     "básico" | "intermedio" | "avanzado",
 *       "question":       string,          // Spanish only — no translations present
 *       "options":        { "a","b","c","d": string },
 *       "correct_answer": "a",             // keyed into `options` (always "a" in this file)
 *       "explanation":    string,          // bank rationale, Spanish
 *       "source":         string           // e.g. "Core 1 - Lección 6" — a textual claim
 *     }]
 *   }
 *
 * Note on the bundled data: every `correct_answer` is `"a"`. Answer-order
 * randomization is therefore not cosmetic — without it the quiz is trivially
 * gameable. See `quiz/generateQuiz.ts`.
 *
 * The parser tolerates common shape variations (options as an array, numeric
 * correct-answer indices, per-language prompt objects) so a differently shaped
 * bank can be loaded without a code change, but it never invents data.
 */
import type {
  AnswerOption,
  ContentLanguage,
  LocalizedText,
  Question,
  QuestionBank,
  QuestionBankMetadata,
} from './types';

const CONTENT_LANGUAGES: ContentLanguage[] = ['es', 'en'];

export class QuestionBankParseError extends Error {
  readonly code: 'invalid-json' | 'unrecognized-schema';
  constructor(code: 'invalid-json' | 'unrecognized-schema', message: string) {
    super(message);
    this.name = 'QuestionBankParseError';
    this.code = code;
  }
}

type Json = unknown;

function isRecord(value: Json): value is Record<string, Json> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asString(value: Json): string | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return undefined;
}

/**
 * Read a field that may be either a plain string (single language) or a
 * `{ es, en }` map. Plain strings are attributed to `defaultLanguage` — we
 * record which language the text is actually in rather than assuming.
 */
function readLocalized(value: Json, defaultLanguage: ContentLanguage): LocalizedText | undefined {
  const plain = asString(value);
  if (plain !== undefined) return { [defaultLanguage]: plain };

  if (isRecord(value)) {
    const localized: LocalizedText = {};
    for (const language of CONTENT_LANGUAGES) {
      const text = asString(value[language]);
      if (text !== undefined) localized[language] = text;
    }
    return Object.keys(localized).length > 0 ? localized : undefined;
  }
  return undefined;
}

const PROMPT_KEYS = ['question', 'prompt', 'text', 'statement', 'enunciado', 'pregunta'];
const OPTIONS_KEYS = ['options', 'answers', 'choices', 'opciones', 'respuestas'];
const CORRECT_KEYS = ['correct_answer', 'correctAnswer', 'correct', 'answer', 'respuesta_correcta', 'solution'];
const EXPLANATION_KEYS = ['explanation', 'rationale', 'explicacion', 'explicación', 'justification'];
const SOURCE_KEYS = ['source', 'reference', 'fuente', 'referencia'];

function pick(record: Record<string, Json>, keys: string[]): Json {
  for (const key of keys) {
    if (key in record && record[key] !== null && record[key] !== undefined) return record[key];
  }
  return undefined;
}

/** Option ids: `"a"`, `"b"`, … for keyed objects; positional letters for arrays. */
function indexToOptionId(index: number): string {
  let id = '';
  let n = index;
  do {
    id = String.fromCharCode(97 + (n % 26)) + id;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return id;
}

function readOptions(value: Json, defaultLanguage: ContentLanguage): AnswerOption[] {
  if (Array.isArray(value)) {
    return value.map((entry, index) => {
      // Array entries may be bare strings or `{ id, text }` records.
      if (isRecord(entry)) {
        const id = asString(entry.id ?? entry.key ?? entry.value) ?? indexToOptionId(index);
        const text = readLocalized(pick(entry, ['text', 'label', 'option', 'texto']) ?? entry, defaultLanguage) ?? {};
        return { id, text };
      }
      return { id: indexToOptionId(index), text: readLocalized(entry, defaultLanguage) ?? {} };
    });
  }

  if (isRecord(value)) {
    // Either `{ a: "…", b: "…" }` or `{ es: [...], en: [...] }`.
    const languageKeys = Object.keys(value).filter((key) => CONTENT_LANGUAGES.includes(key as ContentLanguage));
    const looksPerLanguage = languageKeys.length > 0 && languageKeys.every((key) => Array.isArray(value[key]));
    if (looksPerLanguage) {
      const byLanguage = new Map<ContentLanguage, string[]>();
      let length = 0;
      for (const key of languageKeys) {
        const list = (value[key] as Json[]).map((entry) => asString(entry) ?? '');
        byLanguage.set(key as ContentLanguage, list);
        length = Math.max(length, list.length);
      }
      return Array.from({ length }, (_unused, index) => {
        const text: LocalizedText = {};
        for (const [language, list] of byLanguage) {
          const entry = list[index];
          if (entry) text[language] = entry;
        }
        return { id: indexToOptionId(index), text };
      });
    }

    return Object.entries(value).map(([key, entry]) => ({
      id: key,
      text: readLocalized(entry, defaultLanguage) ?? {},
    }));
  }

  return [];
}

/**
 * Resolve the correct answer to an option **id**.
 * Accepts an id (`"a"`), a 0-based index (`2`) or a 1-based index when the
 * value cannot be a valid 0-based one. Positional forms are resolved once,
 * here, and never used again — shuffling later cannot desynchronize them.
 */
function readCorrectOptionId(value: Json, options: AnswerOption[]): string | undefined {
  if (options.length === 0) return undefined;

  if (typeof value === 'number' && Number.isInteger(value)) {
    if (value >= 0 && value < options.length) return options[value]!.id;
    if (value >= 1 && value <= options.length) return options[value - 1]!.id;
    return undefined;
  }

  const raw = asString(value);
  if (raw === undefined) return undefined;

  const byId = options.find((option) => option.id === raw) ?? options.find((option) => option.id === raw.toLowerCase());
  if (byId) return byId.id;

  if (/^\d+$/.test(raw)) return readCorrectOptionId(Number(raw), options);

  // Last resort: the bank stored the answer text rather than its key.
  const byText = options.find((option) =>
    Object.values(option.text).some((text) => text?.trim().toLowerCase() === raw.toLowerCase()),
  );
  return byText?.id;
}

function parseQuestion(raw: Json, index: number, defaultLanguage: ContentLanguage): Question | null {
  if (!isRecord(raw)) return null;

  const options = readOptions(pick(raw, OPTIONS_KEYS), defaultLanguage);
  const question: Question = {
    // Fall back to the position only when the bank has no id at all; a real id
    // always wins so results and exports stay traceable to the source file.
    id: asString(raw.id ?? raw.questionId ?? raw.uid) ?? `q${index + 1}`,
    prompt: readLocalized(pick(raw, PROMPT_KEYS), defaultLanguage) ?? {},
    options,
    correctOptionId: readCorrectOptionId(pick(raw, CORRECT_KEYS), options) ?? '',
    category: asString(pick(raw, ['category', 'topic', 'categoria', 'categoría', 'tema'])),
    difficulty: asString(pick(raw, ['difficulty', 'level', 'dificultad', 'nivel'])),
    bankExplanation: readLocalized(pick(raw, EXPLANATION_KEYS), defaultLanguage),
    bankSourceLabel: asString(pick(raw, SOURCE_KEYS)),
  };
  return question;
}

function detectContentLanguages(questions: Question[]): ContentLanguage[] {
  const found = new Set<ContentLanguage>();
  for (const question of questions) {
    for (const language of CONTENT_LANGUAGES) {
      if (question.prompt[language]) found.add(language);
    }
  }
  return CONTENT_LANGUAGES.filter((language) => found.has(language));
}

export interface ParseOptions {
  /**
   * Language attributed to untagged single-language text. The bundled bank is
   * Spanish, so that is the default; it is a declaration about the data, not a
   * translation.
   */
  defaultContentLanguage?: ContentLanguage;
}

/** Parse an already-decoded JSON value into the normalized bank model. */
export function parseQuestionBank(raw: Json, options: ParseOptions = {}): QuestionBank {
  const defaultLanguage = options.defaultContentLanguage ?? 'es';

  const rawQuestions = Array.isArray(raw)
    ? raw
    : isRecord(raw)
      ? ((pick(raw, ['questions', 'items', 'preguntas', 'data']) as Json[] | undefined) ?? undefined)
      : undefined;

  if (!Array.isArray(rawQuestions)) {
    throw new QuestionBankParseError(
      'unrecognized-schema',
      'No question array found. Expected a top-level array or a "questions" property.',
    );
  }

  const questions = rawQuestions
    .map((entry, index) => parseQuestion(entry, index, defaultLanguage))
    .filter((question): question is Question => question !== null);

  const rawMetadata = isRecord(raw) && isRecord(raw.metadata) ? raw.metadata : {};
  const availableContentLanguages = detectContentLanguages(questions);
  const primaryContentLanguage = availableContentLanguages[0] ?? defaultLanguage;

  const metadata: QuestionBankMetadata = {
    title: asString(rawMetadata.title ?? rawMetadata.name),
    version: asString(rawMetadata.version),
    generatedFrom: Array.isArray(rawMetadata.generated_from)
      ? rawMetadata.generated_from.map((entry) => asString(entry)).filter((entry): entry is string => !!entry)
      : undefined,
    availableContentLanguages: availableContentLanguages.length > 0 ? availableContentLanguages : [defaultLanguage],
    primaryContentLanguage,
  };

  const declaredCategories =
    isRecord(raw) && Array.isArray(raw.categories)
      ? raw.categories.map((entry) => asString(entry)).filter((entry): entry is string => !!entry)
      : [];

  const usedCategories = [...new Set(questions.map((q) => q.category).filter((c): c is string => !!c))];
  // Declared order first (it is curated), then anything a question uses that
  // the declaration omitted.
  const categories = [
    ...declaredCategories.filter((category) => usedCategories.includes(category)),
    ...usedCategories.filter((category) => !declaredCategories.includes(category)),
  ];

  const difficulties = [...new Set(questions.map((q) => q.difficulty).filter((d): d is string => !!d))];

  return { metadata, questions, categories, difficulties };
}

/** Parse raw JSON text, turning syntax errors into a typed, translatable error. */
export function parseQuestionBankFromText(text: string, options: ParseOptions = {}): QuestionBank {
  let decoded: Json;
  try {
    decoded = JSON.parse(text);
  } catch (error) {
    throw new QuestionBankParseError('invalid-json', error instanceof Error ? error.message : 'Malformed JSON');
  }
  return parseQuestionBank(decoded, options);
}
