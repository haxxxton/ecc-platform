import { Skeleton, Stack, Typography } from '@mui/material';
import type { ScopeTabLabelProps } from './types';

const ScopeTabLabel = ({ count, highlighted, isLoading, label }: ScopeTabLabelProps) => (
  <Stack
    spacing={0.25}
    sx={{ alignItems: 'flex-start', color: highlighted ? 'error.main' : 'inherit' }}
  >
    <Typography variant="caption" sx={{ fontWeight: 800 }}>
      {label}
    </Typography>
    {isLoading ? (
      <Skeleton aria-label={`Loading ${label} count`} width={32} />
    ) : (
      <Typography variant="h5" sx={{ fontWeight: 850 }}>
        {count}
      </Typography>
    )}
  </Stack>
);

export default ScopeTabLabel;
