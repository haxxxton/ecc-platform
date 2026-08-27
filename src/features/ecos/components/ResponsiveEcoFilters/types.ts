import type { EcoFiltersBarProps } from '../EcoFiltersBar/types';

export type EcoFiltersLauncherProps = {
  appliedFilterCount: number;
  isLoading: boolean;
  onOpen: () => void;
};

export type EcoFiltersDialogProps = EcoFiltersBarProps & {
  appliedFilterCount: number;
  onClose: () => void;
  open: boolean;
};
