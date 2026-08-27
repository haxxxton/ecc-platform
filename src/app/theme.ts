import { createTheme } from '@mui/material/styles';

export function createAppTheme(mode: 'light' | 'dark') {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#0f4c81',
      },
      secondary: {
        main: '#6a1b9a',
      },
      warning: {
        main: '#ef6c00',
      },
      error: {
        main: '#c62828',
      },
      success: {
        main: '#2e7d32',
      },
      background: {
        default: mode === 'light' ? '#f3f6f9' : '#101820',
      },
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily:
        'Inter, Segoe UI, Roboto, Helvetica, Arial, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      h1: {
        fontSize: '1.45rem',
        fontWeight: 750,
      },
      h2: {
        fontSize: '1.2rem',
        fontWeight: 750,
      },
      h3: {
        fontSize: '1rem',
        fontWeight: 750,
      },
      button: {
        textTransform: 'none',
        fontWeight: 700,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 800,
            whiteSpace: 'nowrap',
          },
        },
      },
    },
  });
}
