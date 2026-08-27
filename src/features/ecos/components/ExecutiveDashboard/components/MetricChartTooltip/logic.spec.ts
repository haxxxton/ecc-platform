import { describe, expect, it } from 'vitest';
import type { TooltipPayloadEntry } from 'recharts';
import { getMetricTooltipDatum } from './logic';

describe('getMetricTooltipDatum', () => {
  it('extracts the category label and count from a Recharts payload', () => {
    const payload = [{ payload: { name: 'Avery Rowan', count: 14 } }] as TooltipPayloadEntry[];

    expect(getMetricTooltipDatum(payload)).toEqual({ name: 'Avery Rowan', count: 14 });
  });

  it('ignores incomplete payloads', () => {
    expect(getMetricTooltipDatum([])).toBeUndefined();
  });
});
