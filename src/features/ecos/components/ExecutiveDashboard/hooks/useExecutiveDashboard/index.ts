import type { EcoFilters } from '../../../../types';
import type { ExecutiveDashboardProps } from '../../types';

export const useExecutiveDashboard = ({
  metrics,
  onFilter,
}: Pick<ExecutiveDashboardProps, 'metrics' | 'onFilter'>) => {
  const filterStageByChartLabel = (stageLabel: string) => {
    const statusCode =
      metrics.active.find((eco) => eco.StatusCode?.includes(stageLabel))?.StatusCode ?? stageLabel;
    onFilter('stage', statusCode);
  };

  const filterOwner = (owner: string) => onFilter('owner', owner);

  const filterCategory = <Key extends keyof EcoFilters>(key: Key, value: EcoFilters[Key]) =>
    onFilter(key, value);

  return {
    filterCategory,
    filterOwner,
    filterStageByChartLabel,
  };
};
