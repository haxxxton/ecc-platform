import type { TooltipPayloadEntry } from 'recharts';
import type { CountDatum } from '../../../../logic/ecoMetrics';

export function getMetricTooltipDatum(payload: readonly TooltipPayloadEntry[]) {
  const datum = payload[0]?.payload as Partial<CountDatum> | undefined;

  if (typeof datum?.name !== 'string' || typeof datum.count !== 'number') return undefined;

  return {
    name: datum.name,
    count: datum.count,
  };
}
