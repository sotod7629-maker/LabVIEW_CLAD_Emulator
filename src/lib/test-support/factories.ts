/** Test fixtures shared across suites. */

import type { RawQuestion, RawQuestionBank } from '../data/schema';

export function makeQuestion(overrides: Partial<RawQuestion> = {}): RawQuestion {
  return {
    id: 1,
    category: 'Estructuras',
    difficulty: 'básico',
    question: '¿Pregunta de ejemplo?',
    options: { a: 'Correcta', b: 'Opción B', c: 'Opción C', d: 'Opción D' },
    correct_answer: 'a',
    explanation: 'Explicación del banco.',
    source: 'Core 1 - Lección 7',
    ...overrides,
  };
}

/** A bank of `count` questions, each with a distinct correct option letter. */
export function makeBank(count: number): RawQuestionBank {
  const letters = ['a', 'b', 'c', 'd'] as const;
  return {
    metadata: {
      title: 'Test Bank',
      total_questions: count,
      generated_from: [],
      version: '1.0',
    },
    categories: ['Estructuras', 'Arrays'],
    questions: Array.from({ length: count }, (_, index) => {
      const correct = letters[index % letters.length]!;
      return makeQuestion({
        id: index + 1,
        category: index % 2 === 0 ? 'Estructuras' : 'Arrays',
        question: `Pregunta ${index + 1}`,
        options: {
          a: `Q${index + 1} opción a`,
          b: `Q${index + 1} opción b`,
          c: `Q${index + 1} opción c`,
          d: `Q${index + 1} opción d`,
        },
        correct_answer: correct,
      });
    }),
  };
}
