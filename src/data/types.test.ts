import { describe, expect, it } from 'vitest';
import { resolveText } from './types';

describe('resolveText', () => {
  it('returns the requested language when it exists', () => {
    expect(resolveText({ es: 'Hola', en: 'Hello' }, 'en', 'es')).toEqual({
      text: 'Hello',
      language: 'en',
      isFallback: false,
    });
  });

  it('flags a fallback instead of inventing a translation', () => {
    expect(resolveText({ es: 'Hola' }, 'en', 'es')).toEqual({
      text: 'Hola',
      language: 'es',
      isFallback: true,
    });
  });

  it('handles missing and empty values without throwing', () => {
    expect(resolveText(undefined, 'es', 'es').text).toBe('');
    expect(resolveText({}, 'es', 'es').text).toBe('');
    expect(resolveText({ es: '' }, 'es', 'es').text).toBe('');
  });
});
