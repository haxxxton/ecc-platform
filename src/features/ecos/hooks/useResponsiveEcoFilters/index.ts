import { useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { countAppliedFilters } from '../../logic/ecoFilterCount';
import type { EcoFilters } from '../../types';

export function useResponsiveEcoFilters(filters: EcoFilters) {
  const theme = useTheme();
  const usesFilterDialog = useMediaQuery(theme.breakpoints.down('md'));
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return {
    appliedFilterCount: countAppliedFilters(filters),
    closeDialog: () => setIsDialogOpen(false),
    isDialogOpen: isDialogOpen && usesFilterDialog,
    openDialog: () => setIsDialogOpen(true),
    usesFilterDialog,
  };
}
