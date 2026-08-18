import { describe, expect, it } from 'vitest';
import { chunkDocument, DocumentIndex } from './documentIndex';
import { tokenize, splitSentences, normalizeText } from './tokenizer';
import type { ReferenceDocument } from './types';

function makeDocument(name: string, pages: string[]): ReferenceDocument {
  return {
    id: `doc-${name}`,
    name,
    pageCount: pages.length,
    pages: pages.map((text, index) => ({ pageNumber: index + 1, text })),
    extractedCharacters: pages.join('').length,
    sizeBytes: 1024,
    addedAt: new Date().toISOString(),
  };
}

const CORE1 = makeDocument('LabVIEW_Core_1.pdf', [
  `Lección 1: El entorno de LabVIEW
El Panel Frontal es la interfaz de usuario de un VI. Contiene los controles e indicadores con los que
interactúa el usuario final. Los controles son las entradas y los indicadores son las salidas del VI.
El Diagrama de Bloques contiene el código gráfico que define el comportamiento del VI.`,
  `Lección 6: Estructuras de repetición
El bucle While ejecuta su contenido al menos una vez y continúa hasta que la terminal condicional
recibe el valor indicado. El bucle For ejecuta un número predeterminado de iteraciones definido por
la terminal de conteo N. Los registros de desplazamiento transfieren valores entre iteraciones.`,
]);

const CORE2 = makeDocument('LabVIEW_Core_2.pdf', [
  `Lección 2: Manejo de errores
El cluster de error propaga la información de error a través del diagrama y fuerza el orden de
ejecución entre nodos. La estructura de manejo de errores debe examinar el estado antes de continuar.`,
]);

describe('tokenizer', () => {
  it('folds accents and case', () => {
    expect(normalizeText('Lección Ñandú')).toBe('leccion nandu');
  });

  it('drops stop words in both languages', () => {
    expect(tokenize('el de la the of and panel')).toEqual(['panel']);
  });

  it('conflates simple plurals', () => {
    expect(tokenize('controles indicadores')).toEqual(tokenize('control indicador'));
  });

  it('splits sentences on terminal punctuation', () => {
    expect(splitSentences('Uno. Dos. ¿Tres? Cuatro')).toHaveLength(4);
  });
});

describe('chunking', () => {
  const chunks = chunkDocument(CORE1);

  it('tags every chunk with its document and page', () => {
    expect(chunks.length).toBeGreaterThan(0);
    for (const chunk of chunks) {
      expect(chunk.documentName).toBe('LabVIEW_Core_1.pdf');
      expect([1, 2]).toContain(chunk.pageNumber);
      expect(chunk.tokens.length).toBeGreaterThan(0);
    }
  });

  it('detects the lesson heading as the section', () => {
    const page2 = chunks.find((chunk) => chunk.pageNumber === 2);
    expect(page2?.section).toBe('Lección 6: Estructuras de repetición');
  });

  it('never invents a section when no heading precedes the text', () => {
    const document = makeDocument('plain.pdf', ['esta es una linea de texto corriente sin ningun encabezado previo que sea detectable como titulo de seccion.']);
    for (const chunk of chunkDocument(document)) {
      expect(chunk.section).toBeUndefined();
    }
  });
});

describe('DocumentIndex search', () => {
  const index = DocumentIndex.build([CORE1, CORE2]);

  it('reports emptiness honestly', () => {
    expect(DocumentIndex.build([]).isEmpty).toBe(true);
    expect(index.isEmpty).toBe(false);
    expect(index.chunkCount).toBeGreaterThan(0);
  });

  const query = (text: string) => {
    const terms = new Map<string, number>();
    for (const token of tokenize(text)) terms.set(token, (terms.get(token) ?? 0) + 1);
    return terms;
  };

  it('finds the passage that answers a question', () => {
    const hits = index.search(query('Panel Frontal controles indicadores usuario final'), { limit: 3 });
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0]!.chunk.documentName).toBe('LabVIEW_Core_1.pdf');
    expect(hits[0]!.chunk.pageNumber).toBe(1);
    expect(hits[0]!.chunk.text).toContain('Panel Frontal');
  });

  it('routes a question to the right document out of several', () => {
    const hits = index.search(query('cluster de error orden de ejecución'), { limit: 1 });
    expect(hits[0]!.chunk.documentName).toBe('LabVIEW_Core_2.pdf');
  });

  it('returns the matched terms so a citation can be justified', () => {
    const hits = index.search(query('registros de desplazamiento iteraciones'), { limit: 1 });
    expect(hits[0]!.matchedTerms.length).toBeGreaterThan(0);
  });

  it('returns nothing for an unrelated query above the score floor', () => {
    expect(index.search(query('termodinámica cuántica relativista'), { minScore: 3.5 })).toEqual([]);
  });

  it('returns nothing for an empty query or an empty index', () => {
    expect(index.search(new Map())).toEqual([]);
    expect(DocumentIndex.build([]).search(query('panel frontal'))).toEqual([]);
  });

  it('can be restricted to a subset of documents', () => {
    const hits = index.search(query('lección'), { documentIds: [CORE2.id], limit: 5, minScore: 0 });
    expect(hits.every((hit) => hit.chunk.documentId === CORE2.id)).toBe(true);
  });
});
