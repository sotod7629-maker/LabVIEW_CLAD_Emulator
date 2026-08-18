/**
 * Integrity checks for the shipped English overlay.
 *
 * The overlay is machine-produced, so it gets verified against the bank rather
 * than trusted: it must cover every question, must not smuggle in any field
 * that could influence grading, and must never change which option is correct.
 */

import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { measureCoverage, parseTranslations } from './translations';
import { generateQuiz } from '../quiz/generateQuiz';
import { generateResults } from '../quiz/scoring';
import { selectAnswer } from '../quiz/generateQuiz';
import { OPTION_KEYS, type RawQuestionBank } from './schema';

const bank = JSON.parse(
  readFileSync('public/data/cuestionario_CLAD_300.json', 'utf8'),
) as RawQuestionBank;
const overlayRaw = JSON.parse(readFileSync('public/data/questions.en.json', 'utf8'));
const overlay = parseTranslations(overlayRaw);

describe('English overlay', () => {
  it('declares its provenance honestly', () => {
    expect(overlayRaw.language).toBe('en');
    expect(String(overlayRaw.provenance)).toMatch(/machine translation/i);
  });

  it('covers every question in the bank completely', () => {
    const coverage = measureCoverage(bank.questions, overlay);
    expect(coverage).toEqual({ complete: bank.questions.length, partial: 0, missing: 0 });
  });

  it('carries no field capable of influencing grading', () => {
    for (const entry of Object.values(overlayRaw.translations as Record<string, unknown>)) {
      const keys = Object.keys(entry as object);
      expect(keys.sort()).toEqual(['explanation', 'options', 'question']);
    }
  });

  it('keys options by the original letters only', () => {
    for (const entry of overlay.values()) {
      for (const key of Object.keys(entry.options ?? {})) {
        expect(OPTION_KEYS).toContain(key);
      }
    }
  });

  it('produces English text distinct from the Spanish source', () => {
    let identical = 0;
    for (const question of bank.questions) {
      if (overlay.get(question.id)?.question === question.question) identical += 1;
    }
    // A handful could legitimately coincide; wholesale duplication could not.
    expect(identical).toBeLessThan(5);
  });

  it('grades an English quiz identically to a Spanish one', () => {
    const config = {
      questionCount: 100,
      mode: 'exam' as const,
      categories: [],
      shuffleQuestions: true,
      shuffleOptions: true,
      seed: 2026,
    };

    const spanish = generateQuiz({
      questions: bank.questions,
      config: { ...config, language: 'es' },
    }).session;
    const english = generateQuiz({
      questions: bank.questions,
      config: { ...config, language: 'en' },
      translations: overlay,
    }).session;

    // Same seed selects the same questions in the same order, and the correct
    // option id must be identical regardless of the display language.
    expect(english.questions.map((q) => q.questionId)).toEqual(
      spanish.questions.map((q) => q.questionId),
    );
    for (let i = 0; i < english.questions.length; i += 1) {
      const en = english.questions[i]!;
      const es = spanish.questions[i]!;
      expect(en.correctOptionId).toBe(es.correctOptionId);
      expect(en.options.map((o) => o.id)).toEqual(es.options.map((o) => o.id));
      expect(en.translationFallback).toBe(false);
      // The English text must actually differ from the Spanish.
      expect(en.prompt).not.toBe(es.prompt);
    }

    // Answering correctly in either language yields the same perfect score.
    const answer = (session: typeof english) =>
      session.questions.reduce(
        (acc, q) => selectAnswer(acc, q.questionId, q.correctOptionId),
        session,
      );
    expect(generateResults(answer(english)).summary.percentage).toBe(100);
    expect(generateResults(answer(spanish)).summary.percentage).toBe(100);
  });
});
