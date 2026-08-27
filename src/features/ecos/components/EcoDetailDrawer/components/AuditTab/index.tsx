import { Stack, Typography } from '@mui/material';
import AuditTimelineItem from '../AuditTimelineItem';
import type { AuditTabProps } from '../types';
import { sortAuditEntriesNewestFirst } from './logic';

const AuditTab = ({ eco }: AuditTabProps) => {
  const entries = sortAuditEntriesNewestFirst(eco.SignoffHistory ?? []);

  return (
    <Stack>
      {entries.length ? (
        entries.map((entry, index) => (
          <AuditTimelineItem
            key={`${entry.Date}-${entry.Action}-${index}`}
            entry={entry}
            isLast={index === entries.length - 1}
          />
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No audit history recorded.
        </Typography>
      )}
    </Stack>
  );
};

export default AuditTab;
