import { buildMetrics } from '../logic/ecoMetrics';

export type ReturnTypeOfBuildMetrics = ReturnType<typeof buildMetrics>;

export type ChipColor =
  'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

export type ChipVariant = 'filled' | 'outlined';

export type ChipPresentation = {
  label: string;
  color: ChipColor;
  variant?: ChipVariant;
};
