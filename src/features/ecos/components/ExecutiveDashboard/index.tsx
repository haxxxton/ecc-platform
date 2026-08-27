import { Box } from '@mui/material';
import BacklogHealthCard from './components/BacklogHealthCard';
import ExecutiveDashboardSkeleton from './components/ExecutiveDashboardSkeleton';
import MetricChart from './components/MetricChart';
import PriorityCategoryTable from './components/PriorityCategoryTable';
import { useExecutiveDashboard } from './hooks/useExecutiveDashboard';
import type { ExecutiveDashboardProps } from './types';

const ExecutiveDashboard = ({ isLoading, metrics, onFilter }: ExecutiveDashboardProps) => {
  const dashboard = useExecutiveDashboard({ metrics, onFilter });

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
      }}
    >
      {isLoading ? (
        <ExecutiveDashboardSkeleton />
      ) : (
        <>
          <Box sx={{ gridColumn: { xs: '1', md: 'span 4' } }}>
            <BacklogHealthCard metrics={metrics} />
          </Box>
          <Box sx={{ gridColumn: { xs: '1', md: 'span 8' } }}>
            <PriorityCategoryTable metrics={metrics} onFilter={dashboard.filterCategory} />
          </Box>
          <Box sx={{ gridColumn: { xs: '1', md: 'span 6' } }}>
            <MetricChart
              title="Workflow Bottlenecks"
              data={metrics.byStage}
              onClick={dashboard.filterStageByChartLabel}
            />
          </Box>
          <Box sx={{ gridColumn: { xs: '1', md: 'span 6' } }}>
            <MetricChart
              title="Owner Workload"
              data={metrics.byOwner}
              onClick={dashboard.filterOwner}
              categoryAxisWidth={150}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ExecutiveDashboard;
