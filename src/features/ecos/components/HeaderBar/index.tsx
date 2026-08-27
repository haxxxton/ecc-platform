import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography, useTheme } from '@mui/material';
import SyncIndicator from '../SyncIndicator';
import CreateEcoAction from './components/CreateEcoAction';
import DraftEcosAction from './components/DraftEcosAction';
import type { HeaderBarProps } from './types';

const HeaderBar = ({
  draftCount,
  isLoading,
  onCreate,
  onShowDrafts,
  syncStatus,
}: HeaderBarProps) => {
  const theme = useTheme();
  const isDark = theme.eccMode === 'dark';

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar
        sx={{
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          gap: { xs: 1, sm: 1.25, md: 1.5 },
          minHeight: 72,
          py: { xs: 1, sm: 0 },
        }}
      >
        <Box sx={{ flex: '1 1 auto', minWidth: { xs: '100%', sm: 0 } }}>
          <Typography variant="h1">ECC Portal Dashboard</Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.35,
              maxWidth: { xs: 'none', sm: 390, md: 'none' },
              opacity: 0.82,
              whiteSpace: 'normal',
            }}
          >
            Open ECOs and recent completions from the configured backend API
          </Typography>
        </Box>
        <CreateEcoAction isLoading={isLoading} onCreate={onCreate} />
        <DraftEcosAction
          draftCount={draftCount}
          isLoading={isLoading}
          onShowDrafts={onShowDrafts}
        />
        <SyncIndicator status={syncStatus} />
        <Tooltip title={isDark ? 'Use light mode' : 'Use dark mode'}>
          <IconButton color="inherit" onClick={theme.toggleEccMode}>
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
