import { Card, CardContent, Skeleton } from '@mui/material';

const ExecutiveDashboardSkeleton = () => (
  <>
    <Card variant="outlined" sx={{ gridColumn: { xs: '1', md: 'span 4' }, height: 300 }}>
      <CardContent>
        <Skeleton width="42%" height={32} />
        <Skeleton variant="rounded" height={210} sx={{ mt: 2 }} />
      </CardContent>
    </Card>
    <Card variant="outlined" sx={{ gridColumn: { xs: '1', md: 'span 8' }, height: 300 }}>
      <CardContent>
        <Skeleton width="36%" height={32} />
        <Skeleton variant="rounded" height={210} sx={{ mt: 2 }} />
      </CardContent>
    </Card>
    <Card variant="outlined" sx={{ gridColumn: { xs: '1', md: 'span 6' }, height: 300 }}>
      <CardContent>
        <Skeleton width="38%" height={32} />
        <Skeleton variant="rounded" height={210} sx={{ mt: 2 }} />
      </CardContent>
    </Card>
    <Card variant="outlined" sx={{ gridColumn: { xs: '1', md: 'span 6' }, height: 300 }}>
      <CardContent>
        <Skeleton width="34%" height={32} />
        <Skeleton variant="rounded" height={210} sx={{ mt: 2 }} />
      </CardContent>
    </Card>
  </>
);

export default ExecutiveDashboardSkeleton;
