import type { EcoSyncStatus } from '../../logic/ecoSyncStatus';

export type SyncIndicatorProps = {
  status: EcoSyncStatus;
};

export type SyncIndicatorPresentation = {
  label: string;
  paletteColor: 'error' | 'success' | 'warning';
  pulses: boolean;
};
