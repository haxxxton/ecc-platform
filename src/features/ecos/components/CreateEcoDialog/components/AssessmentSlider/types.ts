import type { Control } from 'react-hook-form';
import type { EcoFormValues } from '../../types';

export type AssessmentSliderName =
  | 'ProductImpact'
  | 'CustomerImpact'
  | 'CostImpact'
  | 'RegulatoryCompliance'
  | 'ImplementationEffort'
  | 'ScheduleImpact';

export type AssessmentSliderProps = {
  control: Control<EcoFormValues>;
  name: AssessmentSliderName;
  label: string;
  weight: string;
};
