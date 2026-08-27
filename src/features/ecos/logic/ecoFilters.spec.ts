import { describe, expect, it } from 'vitest';
import type { Eco } from '../types';
import { getUniqueEcoValues } from './ecoFilters';

describe('getUniqueEcoValues', () => {
  it('returns sorted, trimmed, unique owner values', () => {
    const ecos = [
      { ChangeOrder: '1', EccUser: ' Avery Rowan ' },
      { ChangeOrder: '2', EccUser: 'Jordan Vale' },
      { ChangeOrder: '3', EccUser: 'Avery Rowan' },
      { ChangeOrder: '4', EccUser: '' },
    ] satisfies Eco[];

    expect(getUniqueEcoValues(ecos, 'EccUser')).toEqual(['Avery Rowan', 'Jordan Vale']);
  });
});
