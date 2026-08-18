/**
 * Structural validation of the question bank (requirement §35).
 *
 * Validation is fail-soft at the question level and fail-hard at the bank
 * level: a single malformed question is quarantined with a reported reason
 * rather than taking the whole application down, but a bank with no usable
 * questions is a hard error. Silent failures are never acceptable — every
 * rejected question produces an issue the UI can surface.
 */

import { isOptionKey, OPTION_KEYS, type RawQuestion, type RawQuestionBank } from './schema';

export type ValidationSeverity = 'error' | 'warning';

export interface ValidationIssue {
  severity: ValidationSeverity;
  /** Machine-readable code so the UI can translate the message. */
  code:
    | 'not-an-object'
    | 'missing-questions'
    | 'empty-questions'
    | 'missing-id'
    | 'duplicate-id'
    | 'missing-question-text'
    | 'missing-options'
    | 'too-few-options'
    | 'empty-option'
    | 'missing-correct-answer'
    | 'correct-answer-not-an-option'
    | 'missing-category'
    | 'no-valid-questions';
  questionId?: number;
  detail?: string;
}

export interface ValidationResult {
  valid: boolean;
  /** Questions that passed validation, safe to build a quiz from. */
  questions: RawQuestion[];
  issues: ValidationIssue[];
}

const MIN_OPTIONS = 2;

function validateQuestion(
  raw: unknown,
  index: number,
  seenIds: Set<number>,
  issues: ValidationIssue[],
): RawQuestion | null {
  if (typeof raw !== 'object' || raw === null) {
    issues.push({ severity: 'error', code: 'not-an-object', detail: `index ${index}` });
    return null;
  }
  const q = raw as Partial<RawQuestion>;

  if (typeof q.id !== 'number' || !Number.isFinite(q.id)) {
    issues.push({ severity: 'error', code: 'missing-id', detail: `index ${index}` });
    return null;
  }
  if (seenIds.has(q.id)) {
    issues.push({ severity: 'error', code: 'duplicate-id', questionId: q.id });
    return null;
  }

  if (typeof q.question !== 'string' || q.question.trim() === '') {
    issues.push({ severity: 'error', code: 'missing-question-text', questionId: q.id });
    return null;
  }

  if (typeof q.options !== 'object' || q.options === null) {
    issues.push({ severity: 'error', code: 'missing-options', questionId: q.id });
    return null;
  }

  const options = {} as Record<string, string>;
  for (const key of OPTION_KEYS) {
    const value = (q.options as Record<string, unknown>)[key];
    if (value === undefined || value === null) continue;
    if (typeof value !== 'string' || value.trim() === '') {
      issues.push({ severity: 'error', code: 'empty-option', questionId: q.id, detail: key });
      continue;
    }
    options[key] = value;
  }
  if (Object.keys(options).length < MIN_OPTIONS) {
    issues.push({ severity: 'error', code: 'too-few-options', questionId: q.id });
    return null;
  }

  if (!isOptionKey(q.correct_answer)) {
    issues.push({ severity: 'error', code: 'missing-correct-answer', questionId: q.id });
    return null;
  }
  if (!(q.correct_answer in options)) {
    issues.push({
      severity: 'error',
      code: 'correct-answer-not-an-option',
      questionId: q.id,
      detail: q.correct_answer,
    });
    return null;
  }

  if (typeof q.category !== 'string' || q.category.trim() === '') {
    // Non-fatal: a question without a category is still answerable.
    issues.push({ severity: 'warning', code: 'missing-category', questionId: q.id });
  }

  seenIds.add(q.id);
  return {
    id: q.id,
    category: typeof q.category === 'string' ? q.category : '',
    difficulty: typeof q.difficulty === 'string' ? q.difficulty : '',
    question: q.question,
    options: options as RawQuestion['options'],
    correct_answer: q.correct_answer,
    explanation: typeof q.explanation === 'string' ? q.explanation : '',
    source: typeof q.source === 'string' ? q.source : '',
  };
}

export function validateQuestionData(bank: unknown): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (typeof bank !== 'object' || bank === null) {
    issues.push({ severity: 'error', code: 'not-an-object' });
    return { valid: false, questions: [], issues };
  }

  const candidate = bank as Partial<RawQuestionBank>;
  if (!Array.isArray(candidate.questions)) {
    issues.push({ severity: 'error', code: 'missing-questions' });
    return { valid: false, questions: [], issues };
  }
  if (candidate.questions.length === 0) {
    issues.push({ severity: 'error', code: 'empty-questions' });
    return { valid: false, questions: [], issues };
  }

  const seenIds = new Set<number>();
  const questions: RawQuestion[] = [];
  candidate.questions.forEach((raw, index) => {
    const question = validateQuestion(raw, index, seenIds, issues);
    if (question) questions.push(question);
  });

  if (questions.length === 0) {
    issues.push({ severity: 'error', code: 'no-valid-questions' });
    return { valid: false, questions: [], issues };
  }

  return { valid: true, questions, issues };
}
