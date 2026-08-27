export const ecoSyncStatuses = {
  fetching: 'fetching',
  latest: 'latest',
  notConnected: 'notConnected',
} as const;

export type EcoSyncStatus = (typeof ecoSyncStatuses)[keyof typeof ecoSyncStatuses];

export function getEcoSyncStatus(isFetching: boolean, isError: boolean): EcoSyncStatus {
  if (isFetching) return ecoSyncStatuses.fetching;
  if (isError) return ecoSyncStatuses.notConnected;
  return ecoSyncStatuses.latest;
}
