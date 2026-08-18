/**
 * Start screen.
 *
 * Progressive disclosure: language and question count are the only things
 * visible by default. Topic/level filters, randomization switches, reference
 * documents and the bank loader live behind disclosures, so the first screen
 * stays a two-decision screen.
 */
import { useMemo, useRef, useState } from 'react';
import type { QuestionBank } from '../data/types';
import type { ValidationReport } from '../data/validation';
import { summarizeIssues } from '../data/validation';
import { countAvailableQuestions, MAX_QUESTIONS, MIN_QUESTIONS } from '../quiz/generateQuiz';
import type { QuizConfig } from '../quiz/types';
import { useI18n, type TranslationKey } from '../i18n';
import type { DocumentLoadFailure, DocumentProgress } from '../hooks/useReferenceDocuments';
import type { ReferenceDocument } from '../documents/types';
import { Callout, Card, SectionHeading } from './primitives';
import { QuestionCountSelector } from './QuestionCountSelector';
import { FilterGroup } from './FilterGroup';
import { DocumentPanel } from './DocumentPanel';

export interface SetupScreenProps {
  bank: QuestionBank;
  report: ValidationReport | null;
  bankLabel: string;
  onLoadBankFile: (file: File) => void;
  onResetBank: () => void;
  documents: readonly ReferenceDocument[];
  chunkCount: number;
  totalPages: number;
  documentProgress: DocumentProgress | null;
  documentFailures: readonly DocumentLoadFailure[];
  maxDocumentBytes: number;
  onAddDocuments: (files: File[]) => void;
  onRemoveDocument: (documentId: string) => void;
  onStart: (config: Omit<QuizConfig, 'uiLanguage' | 'contentLanguage'>) => void;
}

export function SetupScreen(props: SetupScreenProps) {
  const { bank, report, onStart } = props;
  const { t, language } = useI18n();

  const [questionCount, setQuestionCount] = useState(25);
  const [categories, setCategories] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [shuffleQuestionOrder, setShuffleQuestionOrder] = useState(true);
  const [shuffleOptionOrder, setShuffleOptionOrder] = useState(true);
  const bankInputRef = useRef<HTMLInputElement>(null);

  const available = useMemo(
    () => countAvailableQuestions(bank.questions, { categories, difficulties }),
    [bank.questions, categories, difficulties],
  );

  const effectiveCount = Math.min(questionCount, available);
  const isCountValid = questionCount >= MIN_QUESTIONS && questionCount <= MAX_QUESTIONS;
  const canStart = isCountValid && available > 0;

  // The bank ships every correct answer in the same position, so turning answer
  // shuffling off makes the quiz meaningless. We warn rather than forbid.
  const shuffleWarningNeeded = !shuffleOptionOrder;

  const issueSummary = report ? summarizeIssues(report.issues) : [];
  const excludedCount = report ? report.issues.filter((issue) => issue.severity === 'error').length : 0;

  const contentOnlyInOtherLanguage =
    !bank.metadata.availableContentLanguages.includes(language) &&
    bank.metadata.availableContentLanguages.length > 0;

  return (
    <div className="setup">
      <div className="setup__intro">
        <h1 className="setup__title">{t('setup.heading')}</h1>
        <p className="setup__lede">{t('setup.intro')}</p>
        <p className="setup__bank-summary">
          {bank.metadata.title ? <strong>{bank.metadata.title}</strong> : null}
          <span>
            {t('setup.bankSummary', { count: bank.questions.length, categories: bank.categories.length })}
          </span>
        </p>
      </div>

      {contentOnlyInOtherLanguage ? (
        <Callout tone="info" icon="i">
          {t('setup.contentLanguageNotice')}
        </Callout>
      ) : null}

      <Card className="setup__main">
        <QuestionCountSelector value={questionCount} available={available} onChange={setQuestionCount} />

        {!isCountValid ? (
          <Callout tone="danger" icon="!">
            {t('setup.questionCountInvalid', { min: MIN_QUESTIONS, max: MAX_QUESTIONS })}
          </Callout>
        ) : null}

        {isCountValid && available > 0 && questionCount > available ? (
          <Callout tone="warning" icon="i">
            {t('setup.questionCountCapped', { available })}
          </Callout>
        ) : null}

        {available === 0 ? (
          <Callout tone="danger" icon="!">
            {t('setup.noQuestionsForFilters')}
          </Callout>
        ) : null}

        <button
          type="button"
          className="button button--primary button--large setup__start"
          disabled={!canStart}
          onClick={() =>
            onStart({
              questionCount: effectiveCount,
              categories,
              difficulties,
              mode: 'quiz',
              shuffleQuestions: shuffleQuestionOrder,
              shuffleOptions: shuffleOptionOrder,
            })
          }
        >
          {t('setup.start')}
        </button>
      </Card>

      <details className="disclosure">
        <summary className="disclosure__summary">
          <span className="disclosure__title">{t('setup.advanced')}</span>
          <span className="disclosure__hint">{t('setup.advancedHint')}</span>
        </summary>
        <div className="disclosure__content">
          <FilterGroup
            label={t('setup.categories')}
            allLabel={t('setup.allCategories')}
            options={bank.categories}
            selected={categories}
            onChange={setCategories}
          />
          <FilterGroup
            label={t('setup.difficulties')}
            allLabel={t('setup.allDifficulties')}
            options={bank.difficulties}
            selected={difficulties}
            onChange={setDifficulties}
          />

          <div className="switch-list">
            <label className="switch">
              <input
                type="checkbox"
                checked={shuffleQuestionOrder}
                onChange={(event) => setShuffleQuestionOrder(event.target.checked)}
              />
              <span>{t('setup.shuffleQuestions')}</span>
            </label>
            <label className="switch">
              <input
                type="checkbox"
                checked={shuffleOptionOrder}
                onChange={(event) => setShuffleOptionOrder(event.target.checked)}
              />
              <span>{t('setup.shuffleOptions')}</span>
            </label>
            {shuffleWarningNeeded ? (
              <Callout tone="warning" icon="i">
                {t('setup.shuffleOptionsHint')}
              </Callout>
            ) : null}
          </div>
        </div>
      </details>

      <details className="disclosure">
        <summary className="disclosure__summary">
          <span className="disclosure__title">{t('documents.heading')}</span>
          <span className="disclosure__hint">
            {props.documents.length > 0
              ? t('documents.loaded', {
                  count: props.documents.length,
                  pages: props.totalPages,
                  chunks: props.chunkCount,
                })
              : t('documents.none')}
          </span>
        </summary>
        <div className="disclosure__content">
          <DocumentPanel
            documents={props.documents}
            chunkCount={props.chunkCount}
            totalPages={props.totalPages}
            progress={props.documentProgress}
            failures={props.documentFailures}
            maxBytes={props.maxDocumentBytes}
            onAddFiles={props.onAddDocuments}
            onRemove={props.onRemoveDocument}
          />
        </div>
      </details>

      <details className="disclosure">
        <summary className="disclosure__summary">
          <span className="disclosure__title">{t('bank.heading')}</span>
          <span className="disclosure__hint">{props.bankLabel || t('bank.default')}</span>
        </summary>
        <div className="disclosure__content">
          <SectionHeading level={3} title={t('bank.upload')} description={t('bank.uploadHint')} />
          <div className="button-row">
            <button type="button" className="button button--secondary" onClick={() => bankInputRef.current?.click()}>
              {t('bank.upload')}
            </button>
            {props.bankLabel ? (
              <button type="button" className="button button--ghost" onClick={props.onResetBank}>
                {t('bank.reset')}
              </button>
            ) : null}
            <input
              ref={bankInputRef}
              className="visually-hidden"
              type="file"
              accept="application/json,.json"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) props.onLoadBankFile(file);
                event.target.value = '';
              }}
              aria-label={t('bank.upload')}
            />
          </div>

          {issueSummary.length > 0 ? (
            <div className="validation-report">
              <SectionHeading
                level={3}
                title={t('validation.heading')}
                description={t('validation.usable', {
                  count: bank.questions.length,
                  total: bank.questions.length + excludedCount,
                })}
              />
              <ul className="validation-report__list">
                {issueSummary.map((issue) => (
                  <li key={issue.code} className={`validation-report__item is-${issue.severity}`}>
                    <span className="validation-report__code">
                      {t(`validation.${issue.code}` as TranslationKey)}
                    </span>
                    <span className="validation-report__count">
                      {t('validation.affected', { count: issue.count })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </details>
    </div>
  );
}
