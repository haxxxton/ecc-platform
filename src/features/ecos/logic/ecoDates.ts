import { differenceInCalendarDays, isAfter, parseISO, subDays } from 'date-fns';
import { isCompleteStatus, isDraftStatus } from './ecoStatus';
import type { Eco } from '../types';

export function parseEcoDate(value?: string) {
  if (!value) return new Date(0);
  const normalized = value.includes('T') ? value : value.replace(' ', 'T');
  const parsed = parseISO(normalized);
  return Number.isNaN(parsed.getTime()) ? new Date(value) : parsed;
}

export function getCompletionDate(eco: Eco) {
  return parseEcoDate(eco.CompletedDate ?? eco.ApprovedDate ?? eco.DateRaised);
}

export function isCompleteEco(eco: Eco) {
  return isCompleteStatus(eco.EccStatus);
}

export function getAgeDays(eco: Eco, now = new Date()) {
  if (typeof eco.AgeDays === 'number') return eco.AgeDays;
  return Math.max(0, differenceInCalendarDays(now, parseEcoDate(eco.DateRaised)));
}

export function isRecentCompletion(eco: Eco, days = 31, now = new Date()) {
  return isCompleteEco(eco) && isAfter(getCompletionDate(eco), subDays(now, days));
}

export function isActiveEco(eco: Eco, now = new Date()) {
  if (isDraftStatus(eco.EccStatus)) return false;
  return !isCompleteEco(eco) || isRecentCompletion(eco, 31, now);
}
