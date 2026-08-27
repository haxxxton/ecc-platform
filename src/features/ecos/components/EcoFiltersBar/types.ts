import type { Eco, EcoFilters, EcoScope } from '../../types';

export type EcoFiltersBarProps = {
  ecos: Eco[];
  filters: EcoFilters;
  isLoading: boolean;
  visibleCount: number;
  totalCount: number;
  ownerOptions: string[];
  scope: EcoScope;
  onFilter: <Key extends keyof EcoFilters>(key: Key, value: EcoFilters[Key]) => void;
  onScope: (scope: EcoScope) => void;
  onClear: () => void;
};
