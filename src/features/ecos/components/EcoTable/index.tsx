import { Box, Paper, Table, TableContainer, Typography } from '@mui/material';
import { type SortingState, useTable } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import AgeChip from '../AgeChip';
import AssignmentChip from '../AssignmentChip';
import PriorityChip from '../PriorityChip';
import StatusChip from '../StatusChip';
import { stickyStackLayout } from '../../hooks/useStickyStack/constants';
import { formatEcoNumber } from '../../logic/ecoIdentifiers';
import EcoTableBody from './components/EcoTableBody';
import EcoTableColumnGroup from './components/EcoTableColumnGroup';
import EcoTableHead from './components/EcoTableHead';
import EcoTableSkeletonBody from './components/EcoTableSkeletonBody';
import { ecoTableColumnHelper, ecoTableColumnSizes, ecoTableFeatures } from './constants';
import { useSynchronizedScroll } from './hooks/useSynchronizedScroll';
import type { EcoTableProps } from './types';

const EcoTable = ({ ecos, isLoading, onOpenEco }: EcoTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'ChangeOrder', desc: false }]);
  const { bodyScrollerRef, headerScrollerRef, syncBodyToHeader, syncHeaderToBody } =
    useSynchronizedScroll();
  const columns = useMemo(
    () =>
      ecoTableColumnHelper.columns([
        ecoTableColumnHelper.accessor('ChangeOrder', {
          header: 'ECO',
          size: ecoTableColumnSizes.eco,
          cell: ({ row }) => (
            <Typography color="primary" sx={{ fontWeight: 850 }}>
              {formatEcoNumber(row.original.ChangeOrder)}
            </Typography>
          ),
        }),
        ecoTableColumnHelper.accessor('Category', {
          header: 'Category',
          size: ecoTableColumnSizes.category,
        }),
        ecoTableColumnHelper.accessor('EccStatus', {
          header: 'Status',
          size: ecoTableColumnSizes.status,
          cell: ({ row }) => <StatusChip status={row.original.EccStatus} />,
        }),
        ecoTableColumnHelper.accessor('StatusCode', {
          header: 'Stage',
          size: ecoTableColumnSizes.stage,
        }),
        ecoTableColumnHelper.accessor('ActionReqd', {
          header: 'Action Required',
          size: ecoTableColumnSizes.actionRequired,
        }),
        ecoTableColumnHelper.accessor('EccUser', {
          header: 'Owner',
          size: ecoTableColumnSizes.owner,
        }),
        ecoTableColumnHelper.accessor('ClaimedBy', {
          header: 'Assigned To',
          size: ecoTableColumnSizes.assignedTo,
          cell: ({ row }) => <AssignmentChip assignedTo={row.original.ClaimedBy} />,
        }),
        ecoTableColumnHelper.accessor('AgeDays', {
          header: 'Age',
          size: ecoTableColumnSizes.age,
          cell: ({ row }) => <AgeChip eco={row.original} />,
        }),
        ecoTableColumnHelper.accessor('Priority', {
          header: 'Priority',
          size: ecoTableColumnSizes.priority,
          cell: ({ row }) => <PriorityChip priority={row.original.Priority} />,
        }),
        ecoTableColumnHelper.accessor('Description', {
          header: 'Description',
          size: ecoTableColumnSizes.description,
          cell: ({ row }) => (
            <Typography variant="body2" sx={{ minWidth: 260 }}>
              {row.original.Description || 'Untitled ECO'}
            </Typography>
          ),
        }),
      ]),
    [],
  );

  const table = useTable({
    data: ecos,
    columns,
    features: ecoTableFeatures,
    state: { sorting },
    onSortingChange: setSorting,
  });

  return (
    <Paper variant="outlined">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2, py: 1.25 }}>
        <Typography variant="h2">ECO List</Typography>
      </Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          position: 'sticky',
          top: stickyStackLayout.top.tableHeader,
          zIndex: stickyStackLayout.zIndex.tableHeader,
        }}
      >
        <Box
          ref={headerScrollerRef}
          onScroll={syncHeaderToBody}
          sx={{
            overflowX: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          <Table
            size="small"
            sx={{
              minWidth: '100%',
              tableLayout: 'fixed',
              width: Math.max(table.getTotalSize(), 1),
            }}
          >
            <EcoTableColumnGroup table={table} />
            <EcoTableHead table={table} />
          </Table>
        </Box>
      </Box>
      <TableContainer ref={bodyScrollerRef} onScroll={syncBodyToHeader} sx={{ overflowX: 'auto' }}>
        <Table
          size="small"
          sx={{
            minWidth: '100%',
            tableLayout: 'fixed',
            width: Math.max(table.getTotalSize(), 1),
          }}
        >
          <EcoTableColumnGroup table={table} />
          {isLoading ? (
            <EcoTableSkeletonBody table={table} />
          ) : (
            <EcoTableBody table={table} onOpenEco={onOpenEco} />
          )}
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default EcoTable;
