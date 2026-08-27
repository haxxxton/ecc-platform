import type { EcoSyncStatus } from '../../logic/ecoSyncStatus';

export type HeaderBarProps = {
  draftCount: number;
  isLoading: boolean;
  onCreate: () => void;
  onShowDrafts: () => void;
  syncStatus: EcoSyncStatus;
};

export type CreateEcoActionProps = Pick<HeaderBarProps, 'isLoading' | 'onCreate'>;

export type DraftEcosActionProps = Pick<
  HeaderBarProps,
  'draftCount' | 'isLoading' | 'onShowDrafts'
>;
