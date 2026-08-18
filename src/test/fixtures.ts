/** Shared test fixtures. */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { Question } from '../data/types';

const BANK_PATH = fileURLToPath(new URL('../../public/data/cuestionario_CLAD_300.json', import.meta.url));

export function readBundledBankText(): string {
  return readFileSync(BANK_PATH, 'utf8');
}

/** Build a synthetic question with a known correct option. */
export function makeQuestion(overrides: Partial<Question> & { id: string }): Question {
  return {
    prompt: { es: `Pregunta ${overrides.id}` },
    options: [
      { id: 'a', text: { es: 'Opción A' } },
      { id: 'b', text: { es: 'Opción B' } },
      { id: 'c', text: { es: 'Opción C' } },
      { id: 'd', text: { es: 'Opción D' } },
    ],
    correctOptionId: 'a',
    category: 'General',
    difficulty: 'básico',
    ...overrides,
  };
}

export function makeQuestions(count: number): Question[] {
  return Array.from({ length: count }, (_unused, index) =>
    makeQuestion({
      id: String(index + 1),
      // Vary the correct option so tests cannot pass by always picking "a".
      correctOptionId: ['a', 'b', 'c', 'd'][index % 4]!,
      category: index % 2 === 0 ? 'Arrays' : 'Clusters',
      difficulty: index % 3 === 0 ? 'básico' : 'avanzado',
    }),
  );
}
