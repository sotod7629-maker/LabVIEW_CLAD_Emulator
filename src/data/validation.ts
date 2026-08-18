/**
 * Structural validation of a question bank.
 *
 * Runs against the *normalized* model so it is independent of the source
 * schema. Produces machine-readable issues that the UI translates into
 * user-facing messages — no raw errors or stack traces reach the user.
 */
import type { Question, QuestionBank } from './types';

export type ValidationSeverity = 'error' | 'warning';

export type ValidationCode =
  | 'bank.empty'
  | 'bank.notObject'
  | 'question.missingId'
  | 'question.duplicateId'
  | 'question.missingPrompt'
  | 'question.noOptions'
  | 'question.singleOption'
  | 'question.duplicateOptionId'
  | 'question.emptyOption'
  | 'question.missingCorrectAnswer'
  | 'question.correctAnswerNotAnOption';

export interface ValidationIssue {
  code: ValidationCode;
  severity: ValidationSeverity;
  /** Original question id when the issue is scoped to one question. */
  questionId?: string;
  /** Interpolation values for the translated message. */
  details?: Record<string, string | number>;
}

export interface ValidationReport {
  issues: ValidationIssue[];
  /** Questions that passed every `error`-level check and are safe to serve. */
  usableQuestions: Question[];
  get valid(): boolean;
}

/** Validate one question. Returns the issues found; empty means usable. */
export function validateQuestion(question: Question, seenIds: Set<string>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const id = question.id;

  if (!id) {
    issues.push({ code: 'question.missingId', severity: 'error' });
  } else if (seenIds.has(id)) {
    issues.push({ code: 'question.duplicateId', severity: 'error', questionId: id, details: { id } });
  }

  const hasPrompt = Object.values(question.prompt ?? {}).some((t) => typeof t === 'string' && t.trim().length > 0);
  if (!hasPrompt) {
    issues.push({ code: 'question.missingPrompt', severity: 'error', questionId: id });
  }

  const options = question.options ?? [];
  if (options.length === 0) {
    issues.push({ code: 'question.noOptions', severity: 'error', questionId: id });
  } else if (options.length === 1) {
    // Answerable, but a single-option question carries no assessment value.
    issues.push({ code: 'question.singleOption', severity: 'warning', questionId: id });
  }

  const optionIds = new Set<string>();
  for (const option of options) {
    if (optionIds.has(option.id)) {
      issues.push({
        code: 'question.duplicateOptionId',
        severity: 'error',
        questionId: id,
        details: { optionId: option.id },
      });
    }
    optionIds.add(option.id);
    const hasText = Object.values(option.text ?? {}).some((t) => typeof t === 'string' && t.trim().length > 0);
    if (!hasText) {
      issues.push({
        code: 'question.emptyOption',
        severity: 'error',
        questionId: id,
        details: { optionId: option.id },
      });
    }
  }

  if (!question.correctOptionId) {
    issues.push({ code: 'question.missingCorrectAnswer', severity: 'error', questionId: id });
  } else if (options.length > 0 && !optionIds.has(question.correctOptionId)) {
    issues.push({
      code: 'question.correctAnswerNotAnOption',
      severity: 'error',
      questionId: id,
      details: { correctOptionId: question.correctOptionId },
    });
  }

  return issues;
}

/**
 * Validate a whole bank. Questions with `error`-level issues are excluded from
 * `usableQuestions` rather than silently repaired — we never guess a correct
 * answer or fabricate an option.
 */
export function validateQuestionData(bank: QuestionBank | null | undefined): ValidationReport {
  const issues: ValidationIssue[] = [];
  const usableQuestions: Question[] = [];

  if (!bank || typeof bank !== 'object' || !Array.isArray(bank.questions)) {
    issues.push({ code: 'bank.notObject', severity: 'error' });
    return buildReport(issues, usableQuestions);
  }

  if (bank.questions.length === 0) {
    issues.push({ code: 'bank.empty', severity: 'error' });
    return buildReport(issues, usableQuestions);
  }

  const seenIds = new Set<string>();
  for (const question of bank.questions) {
    const questionIssues = validateQuestion(question, seenIds);
    issues.push(...questionIssues);
    if (question.id) seenIds.add(question.id);
    if (!questionIssues.some((issue) => issue.severity === 'error')) {
      usableQuestions.push(question);
    }
  }

  if (usableQuestions.length === 0) {
    issues.push({ code: 'bank.empty', severity: 'error' });
  }

  return buildReport(issues, usableQuestions);
}

function buildReport(issues: ValidationIssue[], usableQuestions: Question[]): ValidationReport {
  return {
    issues,
    usableQuestions,
    get valid() {
      return usableQuestions.length > 0;
    },
  };
}

/** Collapse repeated issue codes so the UI shows "12 questions have X", not 12 rows. */
export function summarizeIssues(issues: ValidationIssue[]): Array<{
  code: ValidationCode;
  severity: ValidationSeverity;
  count: number;
  sampleQuestionIds: string[];
}> {
  const grouped = new Map<ValidationCode, { severity: ValidationSeverity; count: number; sampleQuestionIds: string[] }>();
  for (const issue of issues) {
    const entry = grouped.get(issue.code) ?? { severity: issue.severity, count: 0, sampleQuestionIds: [] };
    entry.count += 1;
    if (issue.questionId && entry.sampleQuestionIds.length < 5) entry.sampleQuestionIds.push(issue.questionId);
    grouped.set(issue.code, entry);
  }
  return [...grouped.entries()].map(([code, entry]) => ({ code, ...entry }));
}
