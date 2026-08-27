import type { EcoScope } from '../../types';
import type { ReturnTypeOfBuildMetrics } from '../types';

export type ScopeTabsProps = {
  metrics: ReturnTypeOfBuildMetrics;
  activeScope: EcoScope;
  isLoading: boolean;
  onSelectScope: (scope: EcoScope) => void;
};

export type ScopeTabDefinition = {
  scope: EcoScope;
  highlightWhenNonZero?: boolean;
  getCount: (metrics: ReturnTypeOfBuildMetrics) => number;
};
