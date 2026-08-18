import { describe, expect, it, vi } from 'vitest';
import { DocumentIndex } from '../documents/documentIndex';
import type { ReferenceDocument } from '../documents/types';
import { ExplanationService } from './explanationService';
import { LocalDocumentProvider } from './localDocumentProvider';
import { RemoteRagProvider } from './remoteRagProvider';
import type { ExplanationRequest } from './types';

const DOCUMENT: ReferenceDocument = {
  id: 'doc-core1',
  name: 'LabVIEW_Core_1.pdf',
  pageCount: 2,
  pages: [
    {
      pageNumber: 1,
      text: `Lección 1: El entorno de LabVIEW
El Panel Frontal es la interfaz de usuario de un VI y contiene los controles e indicadores con los que
interactúa el usuario final. El Diagrama de Bloques contiene el código gráfico del VI y no es visible
para el usuario final durante la ejecución.`,
    },
    {
      pageNumber: 42,
      text: `Lección 6: Bucles
El bucle For ejecuta un número predeterminado de iteraciones definido por la terminal de conteo N.
El bucle While evalúa la terminal condicional al final de cada iteración y por eso siempre se ejecuta
al menos una vez.`,
    },
  ],
  extractedCharacters: 600,
  sizeBytes: 2048,
  addedAt: new Date().toISOString(),
};

const BASE_REQUEST: ExplanationRequest = {
  questionId: '1',
  language: 'es',
  questionText: '¿Cuál ventana de un VI contiene los controles e indicadores del usuario final?',
  correctOptionText: 'Panel Frontal',
  selectedOptionText: 'Diagrama de bloques',
  isCorrect: false,
  category: 'Entorno de LabVIEW',
  bankExplanation: 'El Panel Frontal es la interfaz de usuario del VI.',
  bankSourceLabel: 'Core 1 - Lección 1',
};

function serviceWith(documents: ReferenceDocument[], endpoint?: string) {
  const index = DocumentIndex.build(documents);
  return new ExplanationService({
    providers: [new RemoteRagProvider({ endpoint }), new LocalDocumentProvider(index)],
    corpusFingerprint: documents.map((document) => document.id).join('|') || 'none',
  });
}

describe('LocalDocumentProvider', () => {
  it('is unavailable without documents', () => {
    expect(new LocalDocumentProvider(DocumentIndex.build([])).isAvailable()).toBe(false);
    expect(new LocalDocumentProvider(DocumentIndex.build([DOCUMENT])).isAvailable()).toBe(true);
  });

  it('quotes real text with a real document, page and section', async () => {
    const provider = new LocalDocumentProvider(DocumentIndex.build([DOCUMENT]));
    const evidence = await provider.findEvidence(BASE_REQUEST);

    expect(evidence).not.toBeNull();
    const passage = evidence!.supportingCorrect[0]!;
    expect(passage.citation.documentName).toBe('LabVIEW_Core_1.pdf');
    expect(passage.citation.pageNumber).toBe(1);
    expect(passage.citation.section).toBe('Lección 1: El entorno de LabVIEW');
    // The quoted text must appear verbatim in the source page.
    const sourcePage = DOCUMENT.pages.find((page) => page.pageNumber === passage.citation.pageNumber)!;
    const flatten = (text: string) => text.replace(/\s+/g, ' ').trim();
    for (const fragment of passage.text.split('[\u2026]')) {
      expect(flatten(sourcePage.text)).toContain(flatten(fragment));
    }
  });

  it('returns no evidence when nothing in the corpus is relevant', async () => {
    const provider = new LocalDocumentProvider(DocumentIndex.build([DOCUMENT]));
    const evidence = await provider.findEvidence({
      ...BASE_REQUEST,
      questionId: '999',
      questionText: '¿Cuál es el punto de fusión del tungsteno?',
      correctOptionText: '3422 grados centígrados',
      selectedOptionText: '1500 grados centígrados',
      category: undefined,
    });
    expect(evidence).toBeNull();
  });

  it('does not look up the selected answer when the user was right', async () => {
    const provider = new LocalDocumentProvider(DocumentIndex.build([DOCUMENT]));
    const evidence = await provider.findEvidence({ ...BASE_REQUEST, isCorrect: true });
    expect(evidence!.regardingSelected).toEqual([]);
  });
});

describe('RemoteRagProvider', () => {
  it('reports itself unavailable with no endpoint configured', () => {
    expect(new RemoteRagProvider().isAvailable()).toBe(false);
    expect(new RemoteRagProvider({ endpoint: '' }).isAvailable()).toBe(false);
    expect(new RemoteRagProvider({ endpoint: 'https://example.test/rag' }).isAvailable()).toBe(true);
  });

  it('yields no evidence — never invented text — when the call fails', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('network down'));
    vi.stubGlobal('fetch', fetchMock);
    const provider = new RemoteRagProvider({ endpoint: 'https://example.test/rag' });
    expect(await provider.findEvidence(BASE_REQUEST)).toBeNull();
    vi.unstubAllGlobals();
  });
});

describe('ExplanationService', () => {
  it('marks document-backed explanations as such', async () => {
    const explanation = await serviceWith([DOCUMENT]).explain(BASE_REQUEST);
    expect(explanation.provenance).toBe('document-extract');
    expect(explanation.providerId).toBe('local-bm25');
    expect(explanation.documentEvidence!.supportingCorrect.length).toBeGreaterThan(0);
    // The bank note travels alongside but is kept separate.
    expect(explanation.bankRationale?.text).toBe(BASE_REQUEST.bankExplanation);
    expect(explanation.notices).not.toContain('explanations.notice.noSufficientEvidence');
  });

  it('says no documents were loaded rather than implying one was consulted', async () => {
    const explanation = await serviceWith([]).explain(BASE_REQUEST);
    expect(explanation.provenance).toBe('question-bank');
    expect(explanation.documentEvidence).toBeUndefined();
    expect(explanation.notices).toContain('explanations.notice.noDocumentsLoaded');
    expect(explanation.notices).toContain('explanations.notice.bankOnly');
  });

  it('says no supporting information was found when documents exist but do not match', async () => {
    const explanation = await serviceWith([DOCUMENT]).explain({
      ...BASE_REQUEST,
      questionId: '500',
      questionText: '¿Qué protocolo usa el bus CAN en automoción?',
      correctOptionText: 'Un protocolo diferencial de dos hilos',
      selectedOptionText: 'Fibra óptica monomodo',
      category: undefined,
      bankExplanation: undefined,
      bankSourceLabel: undefined,
    });
    expect(explanation.provenance).toBe('none');
    expect(explanation.notices).toContain('explanations.notice.noSufficientEvidence');
    expect(explanation.documentEvidence).toBeUndefined();
    expect(explanation.bankRationale).toBeUndefined();
  });

  it('caches by question and language', async () => {
    const index = DocumentIndex.build([DOCUMENT]);
    const provider = new LocalDocumentProvider(index);
    const spy = vi.spyOn(provider, 'findEvidence');
    const service = new ExplanationService({ providers: [provider], corpusFingerprint: 'fp' });

    await service.explain(BASE_REQUEST);
    await service.explain(BASE_REQUEST);
    expect(spy).toHaveBeenCalledTimes(1);

    await service.explain({ ...BASE_REQUEST, language: 'en' });
    expect(spy).toHaveBeenCalledTimes(2);

    service.clearCache();
    await service.explain(BASE_REQUEST);
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('reports progress across a batch', async () => {
    const service = serviceWith([DOCUMENT]);
    const requests = Array.from({ length: 12 }, (_unused, index) => ({
      ...BASE_REQUEST,
      questionId: String(index),
    }));
    const progress: number[] = [];
    const explanations = await service.explainAll(requests, (done) => progress.push(done));

    expect(explanations.size).toBe(12);
    expect(progress).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  it('prefers the remote provider when one is configured and answering', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          supportingCorrect: [
            {
              text: 'Servidor',
              citation: { documentId: 'x', documentName: 'server.pdf', pageNumber: 3 },
              score: 9,
              matchedTerms: [],
            },
          ],
          regardingSelected: [],
        }),
      }),
    );
    const explanation = await serviceWith([DOCUMENT], 'https://example.test/rag').explain(BASE_REQUEST);
    expect(explanation.providerId).toBe('remote-rag');
    expect(explanation.documentEvidence!.supportingCorrect[0]!.citation.documentName).toBe('server.pdf');
    vi.unstubAllGlobals();
  });
});

describe('sentence extraction', () => {
  const LONG_PAGE: ReferenceDocument = {
    id: 'doc-long',
    name: 'Long.pdf',
    pageCount: 1,
    pages: [
      {
        pageNumber: 1,
        text: `Los registros de desplazamiento transfieren valores entre iteraciones del bucle.
Este párrafo intermedio habla de temas completamente distintos y no menciona nada relevante.
Otro párrafo de relleno sobre asuntos administrativos sin relación con la programación.
Un registro de desplazamiento sin inicializar conserva el valor de la ejecución anterior.`,
      },
    ],
    extractedCharacters: 400,
    sizeBytes: 1024,
    addedAt: new Date().toISOString(),
  };

  it('marks the gap when the quoted sentences are not adjacent', async () => {
    const provider = new LocalDocumentProvider(DocumentIndex.build([LONG_PAGE]));
    const evidence = await provider.findEvidence({
      ...BASE_REQUEST,
      questionId: 'sr',
      questionText: '¿Qué ocurre con un registro de desplazamiento sin inicializar?',
      correctOptionText: 'Conserva el valor de la ejecución anterior',
      selectedOptionText: null,
      isCorrect: true,
      category: undefined,
    });

    const passage = evidence!.supportingCorrect[0]!;
    expect(passage.text).toContain('[…]');
    // Every fragment either side of the marker is verbatim from the page.
    const pageText = LONG_PAGE.pages[0]!.text.replace(/\s+/g, ' ');
    for (const fragment of passage.text.split('[…]')) {
      expect(pageText).toContain(fragment.trim());
    }
  });
});

describe('evidence deduplication', () => {
  it('never shows the same source passage under both headings', async () => {
    const provider = new LocalDocumentProvider(DocumentIndex.build([DOCUMENT]));
    // Both options are covered by the same page, so a naive text comparison
    // would let one passage appear twice.
    const evidence = await provider.findEvidence({
      ...BASE_REQUEST,
      questionId: 'dedup',
      questionText: '¿Qué bucle ejecuta su contenido al menos una vez?',
      correctOptionText: 'El bucle While, que evalúa la condición al final',
      selectedOptionText: 'El bucle For, con su terminal de conteo N',
      isCorrect: false,
    });

    const locator = (passage: { citation: { documentId: string; pageNumber: number } }) =>
      `${passage.citation.documentId}#${passage.citation.pageNumber}`;
    const supporting = new Set(evidence!.supportingCorrect.map(locator));
    for (const passage of evidence!.regardingSelected) {
      expect(supporting.has(locator(passage))).toBe(false);
    }
  });
});
