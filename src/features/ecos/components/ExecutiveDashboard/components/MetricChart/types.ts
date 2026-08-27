import type { CountDatum } from '../../../../logic/ecoMetrics';

export type MetricChartProps = {
  title: string;
  data: CountDatum[];
  onClick: (name: string) => void;
  categoryAxisWidth?: number;
};
