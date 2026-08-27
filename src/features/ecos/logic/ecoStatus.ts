import { ecoStatuses, statusKeywords, unknownOption } from '../constants';
import type { ChipPresentation } from '../components/types';
import type { EcoStatus } from '../types';

export function normalizeStatus(status?: string) {
  return String(status ?? '')
    .trim()
    .toUpperCase();
}

export function isDraftStatus(status?: EcoStatus) {
  return normalizeStatus(status) === ecoStatuses.draft;
}

export function isCompleteStatus(status?: EcoStatus) {
  return normalizeStatus(status).includes(ecoStatuses.complete);
}

export function getStatusChipPresentation(status?: EcoStatus): ChipPresentation {
  const normalizedStatus = normalizeStatus(status);
  const label = status || unknownOption;

  if (normalizedStatus.includes(ecoStatuses.complete)) {
    return { label, color: 'success', variant: 'outlined' };
  }

  if (normalizedStatus.includes(ecoStatuses.new)) {
    return { label, color: 'info', variant: 'outlined' };
  }

  if (
    normalizedStatus.includes(statusKeywords.hold) ||
    normalizedStatus.includes(statusKeywords.reject)
  ) {
    return { label, color: 'secondary', variant: 'outlined' };
  }

  if (normalizedStatus.includes(statusKeywords.progress)) {
    return { label, color: 'warning', variant: 'outlined' };
  }

  return { label, color: 'default', variant: 'outlined' };
}
