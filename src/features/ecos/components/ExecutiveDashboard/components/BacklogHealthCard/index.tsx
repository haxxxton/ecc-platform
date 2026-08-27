import { Box, Card, CardContent, LinearProgress, Stack, Typography, useTheme } from '@mui/material';
import BacklogHealthInfo from '../BacklogHealthInfo';
import type { BacklogHealthCardProps } from '../types';
import { getHealthColor } from './logic';

const BacklogHealthCard = ({ metrics }: BacklogHealthCardProps) => {
  const theme = useTheme();
  const healthColor = getHealthColor(metrics.healthScore, theme);

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h2">Backlog Health</Typography>
          <BacklogHealthInfo />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mt: 2 }}>
          <Box
            sx={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              border: 8,
              borderColor: healthColor,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              {metrics.healthScore}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3">{metrics.healthLabel}</Typography>
            <Typography variant="body2" color="text.secondary">
              {metrics.open.length} open | {metrics.over180.length} over 180 days
            </Typography>
            <LinearProgress
              variant="determinate"
              value={metrics.healthScore}
              sx={{ mt: 1.5, height: 8, borderRadius: 999 }}
            />
          </Box>
        </Stack>
        <Stack direction="row" sx={{ gap: 3, mt: 2 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Average age
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {metrics.averageAge} days
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Oldest open
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {metrics.oldestAge} days
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BacklogHealthCard;
