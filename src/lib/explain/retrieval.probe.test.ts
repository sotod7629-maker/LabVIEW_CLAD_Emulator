/**
 * Calibration probe run against the REAL index and the REAL question bank.
 *
 * This is a characterisation test: it asserts the evidence gate behaves
 * honestly across the whole bank, and prints a coverage report. It exists to
 * catch silent regressions in retrieval quality — for example a tokeniser
 * change that desyncs the query side from the index.
 */

import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { createDocIndex } from '../search/docIndex';
import { createRetrievalProvider } from './retrievalProvider';
import type { RawQuestionBank } from '../data/schema';

const docIndex = createDocIndex(JSON.parse(readFileSync('public/data/doc-index.json', 'utf8')));
const bank = JSON.parse(
  readFileSync('public/data/cuestionario_CLAD_300.json', 'utf8'),
) as RawQuestionBank;

const provider = createRetrievalProvider({ loadIndex: async () => docIndex });

describe('retrieval provider against the full bank', () => {
  it('classifies every question and never cites an unverifiable page', async () => {
    const byStatus = { documented: 0, insufficient: 0, unavailable: 0, error: 0 };
    const unsupportedTopics: number[] = [];

    for (const question of bank.questions) {
      const explanation = await provider.explain({
        questionId: question.id,
        question: question.question,
        correctAnswerText: question.options[question.correct_answer],
        selectedAnswerText: null,
        bankSource: question.source,
        language: 'es',
      });

      byStatus[explanation.status] += 1;

      if (explanation.status === 'documented') {
        expect(explanation.passages.length).toBeGreaterThan(0);
        for (const passage of explanation.passages) {
          // Every citation must point at a real, named document.
          expect(passage.citation.documentId).toMatch(/^core[12]$/);
          expect(passage.citation.sourceFile).not.toBe('');
          // The excerpt must be genuinely present in the cited document.
          expect(passage.excerpt.length).toBeGreaterThan(0);
        }
      } else {
        expect(explanation.passages).toHaveLength(0);
        unsupportedTopics.push(question.id);
      }
    }

    // eslint-disable-next-line no-console
    console.log(
      `\n  documented: ${byStatus.documented}/${bank.questions.length}` +
        ` (${((byStatus.documented / bank.questions.length) * 100).toFixed(1)}%)` +
        `\n  insufficient: ${byStatus.insufficient}` +
        `\n  first unsupported ids: ${unsupportedTopics.slice(0, 15).join(', ')}`,
    );

    expect(byStatus.unavailable).toBe(0);
    expect(byStatus.error).toBe(0);
    // Sanity band: retrieval must be useful, but must NOT claim to document
    // everything — the guides genuinely do not cover parts of the CLAD blueprint.
    expect(byStatus.documented).toBeGreaterThan(bank.questions.length * 0.6);
    expect(byStatus.documented).toBeLessThan(bank.questions.length);
    expect(byStatus.insufficient).toBeGreaterThan(0);
  }, 60_000);

  it('reports insufficient evidence for topics absent from the guides', async () => {
    // "Formula Node" appears zero times in either participant guide.
    const formulaNodeQuestions = bank.questions.filter((q) =>
      /formula node/i.test(q.question),
    );
    expect(formulaNodeQuestions.length).toBeGreaterThan(0);

    for (const question of formulaNodeQuestions) {
      const explanation = await provider.explain({
        questionId: question.id,
        question: question.question,
        correctAnswerText: question.options[question.correct_answer],
        selectedAnswerText: null,
        bankSource: question.source,
        language: 'es',
      });
      expect(explanation.status).toBe('insufficient');
    }
  }, 30_000);
});
