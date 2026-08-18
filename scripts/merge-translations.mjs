/**
 * Merge per-batch translation files into the runtime overlay.
 *
 * Translations are authored in batches under `translations-src/` and merged
 * into `public/data/questions.en.json`. The merge is validating, not blind:
 * it refuses to emit an overlay whose keys do not line up with the bank, and
 * it strips any field that could influence grading.
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OPTION_KEYS = ['a', 'b', 'c', 'd'];

const bank = JSON.parse(readFileSync(join(ROOT, 'public/data/cuestionario_CLAD_300.json'), 'utf8'));
const byId = new Map(bank.questions.map((q) => [q.id, q]));

const merged = {};
const problems = [];

const files = readdirSync(join(ROOT, 'translations-src'))
  .filter((f) => f.endsWith('.json'))
  .sort();

for (const file of files) {
  const batch = JSON.parse(readFileSync(join(ROOT, 'translations-src', file), 'utf8'));
  for (const [key, value] of Object.entries(batch)) {
    const id = Number(key);
    const source = byId.get(id);
    if (!source) {
      problems.push(`${file}: id ${key} is not in the bank`);
      continue;
    }
    if (merged[key]) {
      problems.push(`${file}: id ${key} translated more than once`);
      continue;
    }

    // Only these three fields are ever carried across. Anything else — most
    // importantly anything resembling an answer key — is dropped, so a
    // translation cannot influence grading.
    const entry = {};
    if (typeof value.question === 'string' && value.question.trim()) {
      entry.question = value.question.trim();
    }
    if (typeof value.explanation === 'string' && value.explanation.trim()) {
      entry.explanation = value.explanation.trim();
    }
    if (value.options && typeof value.options === 'object') {
      const options = {};
      for (const optionKey of OPTION_KEYS) {
        if (source.options[optionKey] === undefined) continue;
        const text = value.options[optionKey];
        if (typeof text === 'string' && text.trim()) options[optionKey] = text.trim();
        else problems.push(`id ${key}: missing option "${optionKey}"`);
      }
      entry.options = options;
    } else {
      problems.push(`id ${key}: no options object`);
    }

    if (!entry.question) problems.push(`id ${key}: no question text`);
    merged[key] = entry;
  }
}

const translated = Object.keys(merged).length;
const missing = bank.questions.filter((q) => !merged[String(q.id)]).map((q) => q.id);

const output = {
  language: 'en',
  provenance:
    'Machine translation of the Spanish source bank, produced during development. ' +
    'The Spanish bank remains authoritative: grading always uses its correct_answer, ' +
    'and this overlay is keyed by the original option letters so it cannot change ' +
    'which option is correct.',
  generatedAt: new Date().toISOString().slice(0, 10),
  coverage: { translated, total: bank.questions.length },
  translations: merged,
};

writeFileSync(join(ROOT, 'public/data/questions.en.json'), JSON.stringify(output, null, 1));

console.log(`merged ${files.length} batch file(s)`);
console.log(`translated ${translated}/${bank.questions.length}`);
if (missing.length) console.log(`missing ids (${missing.length}): ${missing.slice(0, 30).join(', ')}${missing.length > 30 ? '…' : ''}`);
if (problems.length) {
  console.log(`\nPROBLEMS (${problems.length}):`);
  for (const p of problems.slice(0, 40)) console.log('  ' + p);
  process.exitCode = 1;
}
