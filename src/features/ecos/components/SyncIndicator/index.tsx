import { Box, Tooltip, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { syncIndicatorPresentation } from './constants';
import type { SyncIndicatorProps } from './types';

const SyncIndicator = ({ status }: SyncIndicatorProps) => {
  const theme = useTheme();
  const presentation = syncIndicatorPresentation[status];
  const color = theme.palette[presentation.paletteColor].main;

  return (
    <Tooltip title={`Data sync: ${presentation.label}`}>
      <Box
        aria-label={`Data sync: ${presentation.label}`}
        role="status"
        sx={{
          display: 'grid',
          flex: '0 0 auto',
          height: 32,
          placeItems: 'center',
          width: 32,
        }}
      >
        <Box
          sx={{
            animation: presentation.pulses ? 'ecoSyncPulse 1.4s ease-out infinite' : 'none',
            bgcolor: color,
            border: `2px solid ${alpha(theme.palette.common.white, 0.8)}`,
            borderRadius: '50%',
            height: 12,
            width: 12,
            '@keyframes ecoSyncPulse': {
              '0%': { boxShadow: `0 0 0 0 ${alpha(color, 0.65)}` },
              '70%': { boxShadow: `0 0 0 8px ${alpha(color, 0)}` },
              '100%': { boxShadow: `0 0 0 0 ${alpha(color, 0)}` },
            },
            '@media (prefers-reduced-motion: reduce)': {
              animation: 'none',
            },
          }}
        />
      </Box>
    </Tooltip>
  );
};

export default SyncIndicator;
