import { useMemo, useState } from 'react';
import { emptyFilters } from '../constants';
import { applyFilters, applyScope } from '../logic/ecoFilters';
import type { Eco, EcoFilters, EcoScope } from '../types';

export function useEcoFilters(ecos: Eco[]) {
  const [scope, setScope] = useState<EcoScope>('active');
  const [filters, setFilters] = useState<EcoFilters>(emptyFilters);

  const scopedEcos = useMemo(() => applyScope(ecos, scope), [ecos, scope]);
  const filteredEcos = useMemo(() => applyFilters(scopedEcos, filters), [filters, scopedEcos]);

  const updateFilter = <Key extends keyof EcoFilters>(key: Key, value: EcoFilters[Key]) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const clearFilters = () => {
    setScope('active');
    setFilters(emptyFilters);
  };

  return {
    scope,
    setScope,
    filters,
    updateFilter,
    clearFilters,
    scopedEcos,
    filteredEcos,
  };
}
