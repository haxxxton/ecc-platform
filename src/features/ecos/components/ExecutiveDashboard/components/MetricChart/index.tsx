import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import MetricChartTooltip from '../MetricChartTooltip';
import type { MetricChartProps } from './types';

const MetricChart = ({ title, data, onClick, categoryAxisWidth = 95 }: MetricChartProps) => (
  <Card variant="outlined" sx={{ height: 300 }}>
    <CardContent sx={{ height: '100%' }}>
      <Typography variant="h2" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Box sx={{ height: 225 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" allowDecimals={false} />
            <YAxis
              dataKey="name"
              type="category"
              width={categoryAxisWidth}
              interval={0}
              tick={{ fontSize: 11 }}
            />
            <ChartTooltip content={MetricChartTooltip} />
            <Bar
              dataKey="count"
              fill="#0f4c81"
              radius={[0, 4, 4, 0]}
              onClick={(row) => {
                if (typeof row.name === 'string') onClick(row.name);
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </CardContent>
  </Card>
);

export default MetricChart;
