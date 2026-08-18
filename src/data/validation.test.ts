import { describe, expect, it } from 'vitest';
import { parseQuestionBankFromText } from './questionParser';
import { summarizeIssues, validateQuestionData } from './validation';
import { makeQuestion } from '../test/fixtures';
import { readBundledBankText } from '../test/fixtures';
import type { QuestionBank } from './types';

function bankOf(questions: QuestionBank['questions']): QuestionBank {
  return {
    questions,
    categories: [],
    difficulties: [],
    metadata: { availableContentLanguages: ['es'], primaryContentLanguage: 'es' },
  };
}

describe('validateQuestionData', () => {
  it('passes the bundled bank with no errors', () => {
    const report = validateQuestionData(parseQuestionBankFromText(readBundledBankText()));
    expect(report.issues.filter((issue) => issue.severity === 'error')).toEqual([]);
    expect(report.usableQuestions).toHaveLength(300);
    expect(report.valid).toBe(true);
  });

  it('reports an empty bank', () => {
    const report = validateQuestionData(bankOf([]));
    expect(report.issues[0]!.code).toBe('bank.empty');
    expect(report.valid).toBe(false);
  });

  it('reports a non-object payload', () => {
    // @ts-expect-error deliberately invalid input
    const report = validateQuestionData('nope');
    expect(report.issues[0]!.code).toBe('bank.notObject');
  });

  it('detects duplicate ids and keeps only the first', () => {
    const report = validateQuestionData(bankOf([makeQuestion({ id: '1' }), makeQuestion({ id: '1' })]));
    expect(report.issues.some((issue) => issue.code === 'question.duplicateId')).toBe(true);
    expect(report.usableQuestions).toHaveLength(1);
  });

  it('rejects a correct answer that matches no option', () => {
    const report = validateQuestionData(bankOf([makeQuestion({ id: '1', correctOptionId: 'z' })]));
    expect(report.issues.some((issue) => issue.code === 'question.correctAnswerNotAnOption')).toBe(true);
    expect(report.usableQuestions).toHaveLength(0);
  });

  it('rejects a question with no options', () => {
    const report = validateQuestionData(bankOf([makeQuestion({ id: '1', options: [] })]));
    const codes = report.issues.map((issue) => issue.code);
    expect(codes).toContain('question.noOptions');
    expect(report.usableQuestions).toHaveLength(0);
  });

  it('warns but still accepts a single-option question', () => {
    const report = validateQuestionData(
      bankOf([makeQuestion({ id: '1', options: [{ id: 'a', text: { es: 'Sola' } }], correctOptionId: 'a' })]),
    );
    expect(report.issues.some((issue) => issue.code === 'question.singleOption')).toBe(true);
    expect(report.usableQuestions).toHaveLength(1);
  });

  it('rejects an empty prompt and an empty option', () => {
    const report = validateQuestionData(
      bankOf([
        makeQuestion({ id: '1', prompt: { es: '   ' } }),
        makeQuestion({
          id: '2',
          options: [
            { id: 'a', text: { es: '' } },
            { id: 'b', text: { es: 'B' } },
          ],
        }),
      ]),
    );
    const codes = report.issues.map((issue) => issue.code);
    expect(codes).toContain('question.missingPrompt');
    expect(codes).toContain('question.emptyOption');
    expect(report.usableQuestions).toHaveLength(0);
  });

  it('groups repeated issues for display', () => {
    const report = validateQuestionData(
      bankOf([
        makeQuestion({ id: '1', correctOptionId: 'z' }),
        makeQuestion({ id: '2', correctOptionId: 'z' }),
      ]),
    );
    const summary = summarizeIssues(report.issues);
    const entry = summary.find((item) => item.code === 'question.correctAnswerNotAnOption');
    expect(entry?.count).toBe(2);
    expect(entry?.sampleQuestionIds).toEqual(['1', '2']);
  });
});
