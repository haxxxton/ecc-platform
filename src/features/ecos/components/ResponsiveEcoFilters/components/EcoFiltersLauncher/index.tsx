import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, ButtonBase, Chip, CircularProgress, Paper, Typography } from '@mui/material';
import type { EcoFiltersLauncherProps } from '../../types';

const EcoFiltersLauncher = ({ appliedFilterCount, isLoading, onOpen }: EcoFiltersLauncherProps) => (
  <Paper variant="outlined">
    <ButtonBase
      aria-label="Open filters"
      disabled={isLoading}
      onClick={onOpen}
      sx={{
        alignItems: 'center',
        display: 'flex',
        minHeight: 56,
        px: 2,
        py: 1,
        textAlign: 'left',
        width: '100%',
      }}
    >
      <FilterAltOutlinedIcon sx={{ mr: 1.25 }} />
      <Typography sx={{ fontWeight: 800 }}>Filters</Typography>
      {appliedFilterCount > 0 && (
        <Chip
          color="primary"
          label={`${appliedFilterCount} applied`}
          size="small"
          sx={{ ml: 1.25 }}
        />
      )}
      <Box sx={{ flex: 1 }} />
      {isLoading ? (
        <CircularProgress aria-label="Loading filters" size={22} />
      ) : (
        <ChevronRightIcon />
      )}
    </ButtonBase>
  </Paper>
);

export default EcoFiltersLauncher;
