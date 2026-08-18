import { describe, expect, it } from 'vitest';
import { createDocIndex, type DocIndex } from './docIndex';
import {
  extractProperNounTokens,
  looksLikeLabel,
  parseSourceHint,
  searchDocuments,
} from './searchDocuments';
import { bridgeToEnglish, spanishSourceTokens } from './termBridge';
import { isIndexStopword, tokenize, tokenizeQuery } from './tokenize';

describe('tokenize', () => {
  it('lowercases, strips diacritics and drops stopwords', () => {
    expect(tokenize('The Front Panel of a VI')).toEqual(['front', 'panel', 'vi']);
  });

  it('drops Spanish stopwords on the query side only', () => {
    expect(tokenizeQuery('¿Cuál es el panel frontal?')).toEqual(['panel', 'frontal']);
    // The document side keeps them, matching how the index was built.
    expect(tokenize('el panel')).toContain('el');
  });

  it('identifies stopwords omitted from the index by design', () => {
    expect(isIndexStopword('for')).toBe(true);
    expect(isIndexStopword('formula')).toBe(false);
  });
});

describe('bridgeToEnglish', () => {
  it.each([
    ['panel frontal', 'front panel'],
    ['diagrama de bloques', 'block diagram'],
    ['registro de desplazamiento', 'shift register'],
    ['estructura de casos', 'case structure'],
    ['arreglo', 'array'],
    ['agrupamiento', 'cluster'],
  ])('expands %s with %s', (input, expected) => {
    expect(bridgeToEnglish(input)).toContain(expected);
  });

  it('keeps the original tokens so English proper nouns still match', () => {
    expect(bridgeToEnglish('una Case Structure')).toContain('case structure');
  });
});

describe('spanishSourceTokens', () => {
  it('recognises tokens consumed by a Spanish phrase', () => {
    const tokens = spanishSourceTokens('el Panel Frontal del VI');
    expect(tokens.has('frontal')).toBe(true);
    expect(tokens.has('panel')).toBe(true);
  });

  it('recognises directly mapped Spanish tokens', () => {
    expect(spanishSourceTokens('un arreglo').has('arreglo')).toBe(true);
  });

  it('does not claim an untranslated English term as Spanish', () => {
    expect(spanishSourceTokens('Tick Count (ms)').has('tick')).toBe(false);
  });
});

describe('extractProperNounTokens', () => {
  it('captures capitalised technical terms but skips sentence-initial words', () => {
    const tokens = extractProperNounTokens(['¿Para qué sirve un Formula Node en LabVIEW?']);
    expect(tokens.has('formula')).toBe(true);
    expect(tokens.has('node')).toBe(true);
    expect(tokens.has('para')).toBe(false);
  });

  it('splits slash and hyphen compounds', () => {
    const tokens = extractProperNounTokens(['el patrón Productor/Consumidor y Top-Level']);
    expect([...tokens]).toEqual(expect.arrayContaining(['productor', 'consumidor', 'top', 'level']));
  });

  it('ignores capitalised stopwords, which the index omits by design', () => {
    // "For" in "For Loop" is a stopword; treating it as a missing technical
    // term would wrongly suppress every For Loop explanation.
    expect(extractProperNounTokens(['un ciclo For Loop']).has('for')).toBe(false);
  });

  it('ignores tokens containing digits or operators', () => {
    const tokens = extractProperNounTokens(['si A=False y el valor es 1D']);
    expect(tokens.has('a=false')).toBe(false);
    expect(tokens.has('1d')).toBe(false);
  });

  it('can keep the first word for label-shaped text', () => {
    expect(extractProperNounTokens(['Tick Count (ms)']).has('tick')).toBe(false);
    expect(
      extractProperNounTokens(['Tick Count (ms)'], { skipSentenceInitial: false }).has('tick'),
    ).toBe(true);
  });
});

describe('looksLikeLabel', () => {
  it.each([
    ['Tick Count (ms)', true],
    ['Concatenate Strings', true],
    ['Panel Frontal', true],
    ['Porque el Enum asocia nombres descriptivos a cada estado del sistema', false],
    ['No se ejecutan en absoluto durante esa ejecución', false],
  ])('classifies %s', (text, expected) => {
    expect(looksLikeLabel(text)).toBe(expected);
  });
});

describe('parseSourceHint', () => {
  it.each([
    ['Core 1 - Lección 7', { document: 'core1', lesson: 7 }],
    ['Core 2 - Lección 5 / Exam Blueprint CLAD', { document: 'core2', lesson: 5 }],
    ['Exam Blueprint CLAD', { document: null, lesson: null }],
    ['Core 1 - Apéndice A / Exam Blueprint CLAD', { document: 'core1', lesson: null }],
  ])('parses %s', (input, expected) => {
    expect(parseSourceHint(input)).toEqual(expected);
  });
});

/** A tiny hand-built index so ranking behaviour is checked in isolation. */
function fixtureIndex(): DocIndex {
  const texts = [
    'Shift registers transfer values from one loop iteration to the next iteration.',
    'The front panel is the user interface containing controls and indicators.',
    'Completely unrelated prose about installation and licensing agreements.',
  ];
  const postings: Record<string, number[]> = {};
  const lengths: number[] = [];
  texts.forEach((text, index) => {
    const tokens = tokenize(text);
    lengths.push(tokens.length);
    const tf = new Map<string, number>();
    for (const token of tokens) tf.set(token, (tf.get(token) ?? 0) + 1);
    for (const [term, freq] of tf) (postings[term] ??= []).push(index, freq);
  });

  return createDocIndex({
    version: 2,
    builtAt: '2026-01-01',
    documents: [
      {
        id: 'core1',
        title: 'LabVIEW Core 1',
        shortTitle: 'LabVIEW Core 1',
        language: 'en',
        sourceFile: 'core1.md',
        pages: 3,
        chunks: 3,
        lessons: { '7': 'Executing Code Repeatedly Using Loops' },
      },
    ],
    chunks: {
      document: ['core1', 'core1', 'core1'],
      page: ['7-32', '4-8', 'i'],
      lesson: [7, 4, null],
      lessonTitle: ['Executing Code Repeatedly Using Loops', 'Exploring an Existing Application', null],
      section: ['Introduction to Shift Registers', 'Front Panel', null],
      text: texts,
    },
    index: {
      postings,
      lengths,
      avgLength: lengths.reduce((a, b) => a + b, 0) / lengths.length,
    },
  });
}

describe('searchDocuments', () => {
  const index = fixtureIndex();

  it('ranks the on-topic passage first', () => {
    const hits = searchDocuments(index, {
      question: '¿Qué hace un registro de desplazamiento entre iteraciones?',
      correctAnswer: 'Transfiere valores de una iteración a la siguiente',
      limit: 3,
    });
    expect(hits[0]?.chunk.section).toBe('Introduction to Shift Registers');
    expect(hits[0]?.chunk.page).toBe('7-32');
  });

  it('bridges a Spanish question to English prose', () => {
    const hits = searchDocuments(index, {
      question: '¿Qué contiene el Panel Frontal?',
      correctAnswer: 'Controles e indicadores',
      limit: 3,
    });
    expect(hits[0]?.chunk.section).toBe('Front Panel');
  });

  it('returns nothing when no query term is in the index', () => {
    expect(
      searchDocuments(index, { question: 'zzzz qqqq', correctAnswer: 'wwww' }),
    ).toEqual([]);
  });

  it('reports keyTermCoverage below 1 when a named term is absent from the corpus', () => {
    const hits = searchDocuments(index, {
      question: '¿Qué función devuelve el contador de milisegundos?',
      correctAnswer: 'Tick Count (ms)',
      limit: 3,
    });
    // "tick" occurs nowhere in the fixture, so no passage can fully cover it.
    for (const hit of hits) expect(hit.keyTermCoverage).toBeLessThan(1);
  });

  it('does not penalise a Spanish term that is simply untranslated', () => {
    const hits = searchDocuments(index, {
      question: '¿Qué es el Panel Frontal?',
      correctAnswer: 'La interfaz de usuario',
      limit: 3,
    });
    expect(hits[0]?.keyTermCoverage).toBe(1);
  });

  it('boosts passages from the lesson the bank attributes', () => {
    const withHint = searchDocuments(index, {
      question: 'iteration loop values',
      correctAnswer: 'transfer',
      hint: { document: 'core1', lesson: 7 },
      limit: 3,
    });
    const withoutHint = searchDocuments(index, {
      question: 'iteration loop values',
      correctAnswer: 'transfer',
      limit: 3,
    });
    expect(withHint[0]!.score).toBeGreaterThan(withoutHint[0]!.score);
  });
});
