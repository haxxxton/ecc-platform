import { describe, expect, it } from 'vitest';
import { allOption, emptyFilters } from '../constants';
import { countAppliedFilters } from './ecoFilterCount';

describe('countAppliedFilters', () => {
  it('returns zero for the default filter state', () => {
    expect(countAppliedFilters(emptyFilters)).toBe(0);
  });

  it('counts search and selected filter values', () => {
    expect(
      countAppliedFilters({
        ...emptyFilters,
        search: 'drawing',
        owner: 'Avery Rowan',
        priority: '1-High',
      }),
    ).toBe(3);
  });

  it('does not count fields reset to the all option', () => {
    expect(countAppliedFilters({ ...emptyFilters, category: allOption })).toBe(0);
  });
});
