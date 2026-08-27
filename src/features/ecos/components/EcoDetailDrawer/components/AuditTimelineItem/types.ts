import type { SignoffHistoryEntry } from '../../../../types';

export type AuditTimelineItemProps = {
  entry: SignoffHistoryEntry;
  isLast: boolean;
};
