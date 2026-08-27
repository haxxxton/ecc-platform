import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';

const BacklogHealthInfo = () => (
  <Tooltip
    arrow
    title={
      <Box sx={{ maxWidth: 360, p: 0.5 }}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          Backlog health calculation
        </Typography>
        <Typography variant="body2">
          Starts at 100, then subtracts weighted shares of open ECOs: 35 points for 90+ days, 20 for
          unassigned, 10 for final signoff, and 10 for high priority plus 180+ days.
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.75 }}>
          Categories can overlap. The total penalty is capped at 75 and the result is rounded.
          Healthy is 80+, Watch is 60-79, and At Risk is below 60.
        </Typography>
      </Box>
    }
  >
    <IconButton aria-label="Explain backlog health calculation" size="small">
      <InfoOutlinedIcon fontSize="small" />
    </IconButton>
  </Tooltip>
);

export default BacklogHealthInfo;
