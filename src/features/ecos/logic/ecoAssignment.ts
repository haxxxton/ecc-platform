import { unassignedOption } from '../constants';
import type { ChipPresentation } from '../components/types';

export function getAssignmentChipPresentation(assignedTo?: string): ChipPresentation {
  if (assignedTo) {
    return { label: assignedTo, color: 'primary', variant: 'filled' };
  }

  return { label: unassignedOption, color: 'default', variant: 'outlined' };
}
