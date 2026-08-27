import { describe, expect, it } from 'vitest';
import { formatEcoNumber } from './ecoIdentifiers';

describe('formatEcoNumber', () => {
  it('removes backend identifier padding', () => {
    expect(formatEcoNumber('000000000026200')).toBe('26200');
  });

  it('preserves non-numeric mock identifiers', () => {
    expect(formatEcoNumber('MOCK-123')).toBe('MOCK-123');
  });
});
