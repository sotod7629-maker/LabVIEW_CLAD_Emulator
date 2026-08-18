/**
 * Loads and validates the question bank.
 *
 * The bundled bank is fetched at runtime from `public/data/` rather than
 * bundled into the JS, so the file can be replaced without a rebuild. A user
 * can also load their own JSON; both paths go through the same parser and the
 * same validation, and a bank that fails validation is never served.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { parseQuestionBankFromText, QuestionBankParseError } from '../data/questionParser';
import { validateQuestionData, type ValidationReport } from '../data/validation';
import type { QuestionBank } from '../data/types';

export const DEFAULT_BANK_URL = `${import.meta.env.BASE_URL}data/cuestionario_CLAD_300.json`;

/** Refuse absurdly large uploads before parsing them. */
const MAX_BANK_BYTES = 25 * 1024 * 1024;

export type BankErrorCode = 'invalid-json' | 'unrecognized-schema' | 'network' | 'validation';

export interface BankSource {
  kind: 'bundled' | 'file';
  label: string;
}

export interface QuestionBankState {
  status: 'idle' | 'loading' | 'ready' | 'error';
  bank: QuestionBank | null;
  report: ValidationReport | null;
  errorCode: BankErrorCode | null;
  source: BankSource;
}

const INITIAL: QuestionBankState = {
  status: 'idle',
  bank: null,
  report: null,
  errorCode: null,
  source: { kind: 'bundled', label: '' },
};

export function useQuestionBank() {
  const [state, setState] = useState<QuestionBankState>(INITIAL);
  // Guards against a slow bundled fetch overwriting a bank the user just loaded.
  const requestId = useRef(0);

  const applyText = useCallback((text: string, source: BankSource) => {
    const id = ++requestId.current;
    try {
      const bank = parseQuestionBankFromText(text);
      const report = validateQuestionData(bank);
      if (id !== requestId.current) return;
      if (!report.valid) {
        setState({ status: 'error', bank: null, report, errorCode: 'validation', source });
        return;
      }
      // Serve only the questions that passed validation.
      setState({
        status: 'ready',
        bank: { ...bank, questions: report.usableQuestions },
        report,
        errorCode: null,
        source,
      });
    } catch (error) {
      if (id !== requestId.current) return;
      const code: BankErrorCode =
        error instanceof QuestionBankParseError && error.code === 'unrecognized-schema'
          ? 'unrecognized-schema'
          : 'invalid-json';
      setState({ status: 'error', bank: null, report: null, errorCode: code, source });
    }
  }, []);

  const loadBundled = useCallback(async () => {
    const id = ++requestId.current;
    setState((previous) => ({ ...previous, status: 'loading', errorCode: null }));
    try {
      const response = await fetch(DEFAULT_BANK_URL, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      if (id !== requestId.current) return;
      requestId.current -= 1; // let applyText claim the next id
      applyText(text, { kind: 'bundled', label: '' });
    } catch {
      if (id !== requestId.current) return;
      setState({
        status: 'error',
        bank: null,
        report: null,
        errorCode: 'network',
        source: { kind: 'bundled', label: '' },
      });
    }
  }, [applyText]);

  const loadFromFile = useCallback(
    async (file: File) => {
      if (file.size > MAX_BANK_BYTES) {
        setState({
          status: 'error',
          bank: null,
          report: null,
          errorCode: 'invalid-json',
          source: { kind: 'file', label: file.name },
        });
        return;
      }
      setState((previous) => ({ ...previous, status: 'loading', errorCode: null }));
      const text = await file.text();
      applyText(text, { kind: 'file', label: file.name });
    },
    [applyText],
  );

  useEffect(() => {
    void loadBundled();
  }, [loadBundled]);

  return { ...state, loadBundled, loadFromFile };
}
