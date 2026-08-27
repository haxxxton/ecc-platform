import {
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ecoPriorities } from '../../../../constants';
import type { PriorityCategoryTableProps } from '../types';

const PriorityCategoryTable = ({ metrics, onFilter }: PriorityCategoryTableProps) => (
  <Card variant="outlined" sx={{ height: 300 }}>
    <CardContent sx={{ height: '100%', overflow: 'auto' }}>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Priority by Category
      </Typography>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">High</TableCell>
            <TableCell align="right">Med</TableCell>
            <TableCell align="right">Low</TableCell>
            <TableCell align="right">Done 30d</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {metrics.priorityByCategory.map((row) => (
            <TableRow hover key={row.category}>
              <TableCell>
                <Button size="small" onClick={() => onFilter('category', row.category)}>
                  {row.category}
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  color="error"
                  onClick={() => onFilter('priority', ecoPriorities.high)}
                >
                  {row.high}
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  color="warning"
                  onClick={() => onFilter('priority', ecoPriorities.medium)}
                >
                  {row.medium}
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  color="success"
                  onClick={() => onFilter('priority', ecoPriorities.low)}
                >
                  {row.low}
                </Button>
              </TableCell>
              <TableCell align="right">{row.completed30}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default PriorityCategoryTable;
