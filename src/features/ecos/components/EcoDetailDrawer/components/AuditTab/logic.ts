import { format, formatDistanceStrict, isValid, parseISO } from 'date-fns';
import type { SignoffHistoryEntry } from '../../../../types';

const unknownTimeLabel = 'Unknown time';

function parseAuditDate(value: string) {
  const date = parseISO(value);
  return isValid(date) ? date : undefined;
}

export function sortAuditEntriesNewestFirst(entries: SignoffHistoryEntry[]) {
  return [...entries].sort((left, right) => {
    const leftTime = parseAuditDate(left.Date)?.getTime() ?? Number.NEGATIVE_INFINITY;
    const rightTime = parseAuditDate(right.Date)?.getTime() ?? Number.NEGATIVE_INFINITY;
    return rightTime - leftTime;
  });
}

export function formatRelativeAuditTime(value: string, now = new Date()) {
  const date = parseAuditDate(value);
  if (!date) return unknownTimeLabel;
  return formatDistanceStrict(date, now, { addSuffix: true });
}

export function formatFullAuditTime(value: string) {
  const date = parseAuditDate(value);
  if (!date) return unknownTimeLabel;
  return format(date, 'PPpp');
}
