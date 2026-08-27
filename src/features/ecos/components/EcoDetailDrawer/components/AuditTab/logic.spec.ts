import { describe, expect, it } from 'vitest';
import type { SignoffHistoryEntry } from '../../../../types';
import { formatRelativeAuditTime, sortAuditEntriesNewestFirst } from './logic';

describe('audit timeline logic', () => {
  it('sorts entries newest first without mutating the source array', () => {
    const entries = [
      { Action: 'Older', Date: '2026-08-20T10:00:00Z', User: 'A' },
      { Action: 'Newest', Date: '2026-08-22T10:00:00Z', User: 'B' },
    ] satisfies SignoffHistoryEntry[];

    expect(sortAuditEntriesNewestFirst(entries).map(({ Action }) => Action)).toEqual([
      'Newest',
      'Older',
    ]);
    expect(entries[0].Action).toBe('Older');
  });

  it('formats readable relative times', () => {
    const now = new Date('2026-08-22T10:00:00Z');

    expect(formatRelativeAuditTime('2026-08-20T10:00:00Z', now)).toBe('2 days ago');
    expect(formatRelativeAuditTime('2026-08-22T09:15:00Z', now)).toBe('45 minutes ago');
  });

  it('handles invalid timestamps', () => {
    expect(formatRelativeAuditTime('not-a-date')).toBe('Unknown time');
  });
});
