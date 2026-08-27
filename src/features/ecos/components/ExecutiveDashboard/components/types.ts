import type { EcoFilters } from '../../../types';
import type { ReturnTypeOfBuildMetrics } from '../../types';

export type BacklogHealthCardProps = {
  metrics: ReturnTypeOfBuildMetrics;
};

export type PriorityCategoryTableProps = {
  metrics: ReturnTypeOfBuildMetrics;
  onFilter: <Key extends keyof EcoFilters>(key: Key, value: EcoFilters[Key]) => void;
};
