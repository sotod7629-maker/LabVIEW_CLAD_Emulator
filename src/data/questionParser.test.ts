import { describe, expect, it } from 'vitest';
import { parseQuestionBank, parseQuestionBankFromText, QuestionBankParseError } from './questionParser';
import { readBundledBankText } from '../test/fixtures';

describe('parseQuestionBank — bundled CLAD file', () => {
  const bank = parseQuestionBankFromText(readBundledBankText());

  it('reads every question with its original id', () => {
    expect(bank.questions).toHaveLength(300);
    expect(bank.questions[0]!.id).toBe('1');
    expect(bank.questions[299]!.id).toBe('300');
    expect(new Set(bank.questions.map((question) => question.id)).size).toBe(300);
  });

  it('maps the lettered options to stable ids', () => {
    const first = bank.questions[0]!;
    expect(first.options.map((option) => option.id)).toEqual(['a', 'b', 'c', 'd']);
    expect(first.options[0]!.text.es).toBe('Panel Frontal');
  });

  it('resolves correct_answer to an option id, not a position', () => {
    for (const question of bank.questions) {
      expect(question.options.some((option) => option.id === question.correctOptionId)).toBe(true);
    }
  });

  it('captures the bank rationale and its declared source separately from the answer', () => {
    const first = bank.questions[0]!;
    expect(first.bankExplanation?.es).toContain('Panel Frontal');
    expect(first.bankSourceLabel).toBe('Core 1 - Lección 1');
  });

  it('reports Spanish as the only content language present', () => {
    expect(bank.metadata.availableContentLanguages).toEqual(['es']);
    expect(bank.metadata.primaryContentLanguage).toBe('es');
  });

  it('collects the declared categories and difficulties', () => {
    expect(bank.categories).toContain('Estructuras');
    expect(bank.categories).toHaveLength(15);
    expect(bank.difficulties.sort()).toEqual(['avanzado', 'básico', 'intermedio']);
  });

  it('does not alter question or option text', () => {
    const raw = JSON.parse(readBundledBankText()) as {
      questions: Array<{ question: string; options: Record<string, string> }>;
    };
    bank.questions.forEach((question, index) => {
      expect(question.prompt.es).toBe(raw.questions[index]!.question);
      for (const option of question.options) {
        expect(option.text.es).toBe(raw.questions[index]!.options[option.id]);
      }
    });
  });
});

describe('parseQuestionBank — schema tolerance', () => {
  it('accepts options as an array with a numeric 0-based correct answer', () => {
    const bank = parseQuestionBank({
      questions: [{ id: 7, question: 'Q', options: ['A', 'B', 'C'], correctAnswer: 2 }],
    });
    expect(bank.questions[0]!.options.map((option) => option.id)).toEqual(['a', 'b', 'c']);
    expect(bank.questions[0]!.correctOptionId).toBe('c');
  });

  it('accepts a 1-based index when 0-based cannot apply', () => {
    const bank = parseQuestionBank({
      questions: [{ id: 1, question: 'Q', options: ['A', 'B'], correctAnswer: 2 }],
    });
    // 2 is a valid 0-based index only if there were 3 options; with 2 it is 1-based.
    expect(bank.questions[0]!.correctOptionId).toBe('b');
  });

  it('accepts per-language prompts and options', () => {
    const bank = parseQuestionBank({
      questions: [
        {
          id: 1,
          question: { es: 'Pregunta', en: 'Question' },
          options: { es: ['Uno', 'Dos'], en: ['One', 'Two'] },
          correctAnswer: 1,
        },
      ],
    });
    const question = bank.questions[0]!;
    expect(question.prompt).toEqual({ es: 'Pregunta', en: 'Question' });
    expect(question.options[1]!.text).toEqual({ es: 'Dos', en: 'Two' });
    expect(question.correctOptionId).toBe('b');
    expect(bank.metadata.availableContentLanguages).toEqual(['es', 'en']);
  });

  it('accepts a bare top-level array', () => {
    const bank = parseQuestionBank([{ id: 1, question: 'Q', options: { a: 'A', b: 'B' }, correct_answer: 'b' }]);
    expect(bank.questions[0]!.correctOptionId).toBe('b');
  });

  it('resolves a correct answer given as option text', () => {
    const bank = parseQuestionBank({
      questions: [{ id: 1, question: 'Q', options: { a: 'Alpha', b: 'Beta' }, correct_answer: 'Beta' }],
    });
    expect(bank.questions[0]!.correctOptionId).toBe('b');
  });

  it('rejects malformed JSON with a typed error', () => {
    expect(() => parseQuestionBankFromText('{ not json')).toThrowError(QuestionBankParseError);
    try {
      parseQuestionBankFromText('{ not json');
    } catch (error) {
      expect((error as QuestionBankParseError).code).toBe('invalid-json');
    }
  });

  it('rejects a document with no question array', () => {
    try {
      parseQuestionBank({ metadata: {} });
      throw new Error('should have thrown');
    } catch (error) {
      expect((error as QuestionBankParseError).code).toBe('unrecognized-schema');
    }
  });

  it('preserves accents, emoji and multi-line text verbatim', () => {
    const prompt = 'Señal ± 5 V\ncon salto de línea 🎛️';
    const bank = parseQuestionBank({
      questions: [{ id: 1, question: prompt, options: { a: 'Sí', b: 'No' }, correct_answer: 'a' }],
    });
    expect(bank.questions[0]!.prompt.es).toBe(prompt);
  });
});
