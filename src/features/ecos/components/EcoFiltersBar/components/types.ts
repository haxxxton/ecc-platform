import type { EcoFilters, EcoScope } from '../../../types';

export type ActiveFilterChipsProps = {
  filters: EcoFilters;
  scope: EcoScope;
  onFilter: <Key extends keyof EcoFilters>(key: Key, value: EcoFilters[Key]) => void;
  onScope: (scope: EcoScope) => void;
};
