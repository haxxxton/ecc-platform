import { Card, CardContent } from '@mui/material';
import { useResponsiveEcoFilters } from '../../hooks/useResponsiveEcoFilters';
import EcoFiltersBar from '../EcoFiltersBar';
import type { EcoFiltersBarProps } from '../EcoFiltersBar/types';
import EcoFiltersDialog from './components/EcoFiltersDialog';
import EcoFiltersLauncher from './components/EcoFiltersLauncher';

const ResponsiveEcoFilters = (props: EcoFiltersBarProps) => {
  const { appliedFilterCount, closeDialog, isDialogOpen, openDialog, usesFilterDialog } =
    useResponsiveEcoFilters(props.filters);

  if (!usesFilterDialog) {
    return (
      <Card variant="outlined">
        <CardContent>
          <EcoFiltersBar {...props} />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <EcoFiltersLauncher
        appliedFilterCount={appliedFilterCount}
        isLoading={props.isLoading}
        onOpen={openDialog}
      />
      <EcoFiltersDialog
        {...props}
        appliedFilterCount={appliedFilterCount}
        onClose={closeDialog}
        open={isDialogOpen}
      />
    </>
  );
};

export default ResponsiveEcoFilters;
