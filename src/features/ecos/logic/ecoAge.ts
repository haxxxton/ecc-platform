import type { ChipPresentation } from '../components/types';
import type { Eco } from '../types';
import { getAgeDays, isCompleteEco } from './ecoDates';
import { isDraftStatus } from './ecoStatus';

export function getAgeChipPresentation(eco: Eco): ChipPresentation {
  if (isDraftStatus(eco.EccStatus)) {
    return { label: 'Draft', color: 'default', variant: 'outlined' };
  }

  if (isCompleteEco(eco)) {
    return { label: 'Complete', color: 'success', variant: 'outlined' };
  }

  const ageDays = getAgeDays(eco);

  if (ageDays > 180) {
    return { label: `${ageDays}d`, color: 'error', variant: 'filled' };
  }

  if (ageDays > 90) {
    return { label: `${ageDays}d`, color: 'warning', variant: 'filled' };
  }

  if (ageDays > 60) {
    return { label: `${ageDays}d`, color: 'info', variant: 'filled' };
  }

  return { label: `${ageDays}d`, color: 'default', variant: 'outlined' };
}
