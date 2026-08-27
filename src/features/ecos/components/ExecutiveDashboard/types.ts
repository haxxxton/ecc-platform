import type { EcoFilters } from '../../types';
import type { ReturnTypeOfBuildMetrics } from '../types';

export type ExecutiveDashboardProps = {
  isLoading: boolean;
  metrics: ReturnTypeOfBuildMetrics;
  onFilter: <Key extends keyof EcoFilters>(key: Key, value: EcoFilters[Key]) => void;
};
