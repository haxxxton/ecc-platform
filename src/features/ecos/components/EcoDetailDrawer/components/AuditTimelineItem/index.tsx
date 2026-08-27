import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { useRelativeAuditTime } from '../../hooks/useRelativeAuditTime';
import { formatFullAuditTime } from '../AuditTab/logic';
import type { AuditTimelineItemProps } from './types';

const AuditTimelineItem = ({ entry, isLast }: AuditTimelineItemProps) => {
  const relativeTime = useRelativeAuditTime(entry.Date);

  return (
    <Box sx={{ columnGap: 1.5, display: 'grid', gridTemplateColumns: '20px minmax(0, 1fr)' }}>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            bgcolor: 'primary.main',
            border: 3,
            borderColor: 'background.paper',
            borderRadius: '50%',
            height: 14,
            left: 3,
            position: 'absolute',
            top: 4,
            width: 14,
            zIndex: 1,
          }}
        />
        {!isLast && (
          <Box
            sx={{
              borderColor: 'divider',
              borderLeft: 2,
              bottom: -10,
              left: 9,
              position: 'absolute',
              top: 17,
            }}
          />
        )}
      </Box>
      <Box sx={{ minWidth: 0, pb: isLast ? 0 : 2.5 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            alignItems: { sm: 'baseline' },
            gap: { xs: 0.25, sm: 1 },
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 850 }}>
            {entry.Action}
          </Typography>
          <Tooltip title={formatFullAuditTime(entry.Date)}>
            <Typography
              component="span"
              tabIndex={0}
              variant="caption"
              color="text.secondary"
              sx={{ flex: '0 0 auto' }}
            >
              {relativeTime}
            </Typography>
          </Tooltip>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          {entry.User}
        </Typography>
        {entry.Comment && (
          <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
            {entry.Comment}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AuditTimelineItem;
