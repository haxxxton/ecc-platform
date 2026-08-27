import { Paper, Stack, Typography } from '@mui/material';
import { getMetricTooltipDatum } from './logic';
import type { MetricChartTooltipProps } from './types';

const MetricChartTooltip = ({ active, payload }: MetricChartTooltipProps) => {
  const datum = getMetricTooltipDatum(payload);

  if (!active || !datum) return null;

  return (
    <Paper variant="outlined" sx={{ minWidth: 120, p: 1.25 }}>
      <Stack spacing={0.5}>
        <Typography variant="body2" sx={{ fontWeight: 800 }}>
          {datum.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Count: {datum.count}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default MetricChartTooltip;
