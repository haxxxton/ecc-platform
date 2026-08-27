import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    eccMode: 'light' | 'dark';
    toggleEccMode: () => void;
  }

  interface ThemeOptions {
    eccMode?: 'light' | 'dark';
    toggleEccMode?: () => void;
  }
}
