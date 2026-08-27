import { emptyFilters } from '../constants';
import type { EcoFilters } from '../types';

const filterKeys = Object.keys(emptyFilters) as (keyof EcoFilters)[];

export function countAppliedFilters(filters: EcoFilters) {
  return filterKeys.filter((key) => filters[key] !== emptyFilters[key]).length;
}
