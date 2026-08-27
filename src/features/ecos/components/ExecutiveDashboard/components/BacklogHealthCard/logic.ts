import type { Theme } from '@mui/material/styles';

export const getHealthColor = (score: number, theme: Theme) => {
  if (score >= 80) return theme.palette.success.main;
  if (score >= 60) return theme.palette.warning.main;
  return theme.palette.error.main;
};
