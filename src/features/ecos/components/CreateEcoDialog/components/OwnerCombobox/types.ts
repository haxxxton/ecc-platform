import type { Control } from 'react-hook-form';
import type { EcoFormValues } from '../../types';

export type OwnerComboboxProps = {
  control: Control<EcoFormValues>;
  error?: string;
  options: string[];
};
