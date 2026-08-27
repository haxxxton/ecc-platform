import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from './theme';
import SecondTickerProvider from './secondTicker/SecondTickerProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    return localStorage.getItem('eccPortalTheme') === 'dark' ? 'dark' : 'light';
  });
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((current) => {
      const next = current === 'light' ? 'dark' : 'light';
      localStorage.setItem('eccPortalTheme', next);
      return next;
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={{ ...theme, eccMode: mode, toggleEccMode: toggleMode }}>
        <SecondTickerProvider>{children}</SecondTickerProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
