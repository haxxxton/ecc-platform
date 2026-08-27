import { describe, expect, it } from 'vitest';
import { ecoSyncStatuses, getEcoSyncStatus } from './ecoSyncStatus';

describe('getEcoSyncStatus', () => {
  it('reports fetching while a request is active', () => {
    expect(getEcoSyncStatus(true, false)).toBe(ecoSyncStatuses.fetching);
  });

  it('reports fetching while reconnecting after an error', () => {
    expect(getEcoSyncStatus(true, true)).toBe(ecoSyncStatuses.fetching);
  });

  it('reports not connected after a failed request', () => {
    expect(getEcoSyncStatus(false, true)).toBe(ecoSyncStatuses.notConnected);
  });

  it('reports latest after a successful request settles', () => {
    expect(getEcoSyncStatus(false, false)).toBe(ecoSyncStatuses.latest);
  });
});
