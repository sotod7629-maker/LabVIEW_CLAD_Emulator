import { describe, expect, it } from 'vitest';
import { formatDuration, translate } from './index';
import es from './es.json';
import en from './en.json';

describe('translation catalogues', () => {
  it('define exactly the same keys in both languages', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(es).sort());
  });

  it('have no empty strings', () => {
    for (const [key, value] of [...Object.entries(es), ...Object.entries(en)]) {
      expect(value, key).not.toBe('');
    }
  });

  it('use the same placeholders in both languages', () => {
    const placeholders = (value: string) => (value.match(/\{(\w+)\}/g) ?? []).sort();
    for (const key of Object.keys(es) as Array<keyof typeof es>) {
      expect(placeholders(en[key]), key).toEqual(placeholders(es[key]));
    }
  });

  it('cover every explanation notice and validation code', () => {
    const required = [
      'explanations.notice.noDocumentsLoaded',
      'explanations.notice.noSufficientEvidence',
      'explanations.notice.bankOnly',
      'explanations.notice.languageMismatch',
      'validation.question.correctAnswerNotAnOption',
      'documents.error.no-extractable-text',
      'error.quiz.count-out-of-range',
    ];
    for (const key of required) {
      expect(Object.keys(es)).toContain(key);
      expect(Object.keys(en)).toContain(key);
    }
  });
});

describe('translate', () => {
  it('returns the string for the requested language', () => {
    expect(translate('es', 'results.correct')).toBe('Correctas');
    expect(translate('en', 'results.correct')).toBe('Correct');
  });

  it('interpolates values', () => {
    expect(translate('en', 'results.scoreDetail', { correct: 21, total: 25 })).toBe('21 / 25 correct');
    expect(translate('es', 'quiz.progress', { current: 7, total: 25 })).toBe('Pregunta 7 de 25');
  });

  it('leaves an unknown placeholder visible rather than printing undefined', () => {
    expect(translate('en', 'quiz.progress', { current: 1 })).toBe('Question 1 of {total}');
  });

  it('never mixes languages within a rendered string', () => {
    expect(translate('en', 'confirm.unanswered', { count: 3 })).toBe(
      'You have 3 unanswered question(s). Are you sure you want to submit?',
    );
    expect(translate('es', 'confirm.unanswered', { count: 3 })).toBe(
      'Tienes 3 pregunta(s) sin responder. ¿Deseas finalizar de todas formas?',
    );
  });
});

describe('formatDuration', () => {
  it('omits minutes below one minute', () => {
    expect(formatDuration('en', 45)).toBe('45 s');
    expect(formatDuration('es', 45)).toBe('45 s');
  });

  it('shows minutes and seconds above one minute', () => {
    expect(formatDuration('en', 750)).toBe('12 min 30 s');
  });
});
