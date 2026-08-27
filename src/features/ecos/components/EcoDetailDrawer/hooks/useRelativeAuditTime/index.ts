import { useCallback, useSyncExternalStore } from 'react';
import { useSecondTicker } from '../../../../../../app/secondTicker/useSecondTicker';
import { formatRelativeAuditTime } from '../../components/AuditTab/logic';

export function useRelativeAuditTime(value: string) {
  const ticker = useSecondTicker();
  const getSnapshot = useCallback(() => formatRelativeAuditTime(value), [value]);

  return useSyncExternalStore(ticker.subscribe, getSnapshot, getSnapshot);
}
