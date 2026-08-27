import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import type { EcoTableChildProps } from '../../types';

const EcoTableHead = ({ table }: Pick<EcoTableChildProps, 'table'>) => (
  <TableHead>
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          const canSort = header.column.getCanSort();
          const direction = header.column.getIsSorted();
          return (
            <TableCell
              key={header.id}
              sx={{
                bgcolor: 'background.paper',
              }}
            >
              {canSort ? (
                <TableSortLabel
                  active={Boolean(direction)}
                  direction={direction === 'desc' ? 'desc' : 'asc'}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <table.FlexRender header={header} />
                </TableSortLabel>
              ) : (
                <table.FlexRender header={header} />
              )}
            </TableCell>
          );
        })}
      </TableRow>
    ))}
  </TableHead>
);

export default EcoTableHead;
