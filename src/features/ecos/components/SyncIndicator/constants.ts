import { ecoSyncStatuses } from '../../logic/ecoSyncStatus';
import type { EcoSyncStatus } from '../../logic/ecoSyncStatus';
import type { SyncIndicatorPresentation } from './types';

export const syncIndicatorPresentation: Record<EcoSyncStatus, SyncIndicatorPresentation> = {
  [ecoSyncStatuses.fetching]: {
    label: 'Fetching',
    paletteColor: 'warning',
    pulses: true,
  },
  [ecoSyncStatuses.latest]: {
    label: 'Latest',
    paletteColor: 'success',
    pulses: false,
  },
  [ecoSyncStatuses.notConnected]: {
    label: 'Not connected',
    paletteColor: 'error',
    pulses: false,
  },
};
