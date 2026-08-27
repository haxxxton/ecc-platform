import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material';
import { ecoTableSkeletonRows } from '../../constants';
import type { EcoTableChildProps } from '../../types';

const EcoTableSkeletonBody = ({ table }: Pick<EcoTableChildProps, 'table'>) => (
  <TableBody aria-label="Loading ECO records">
    {ecoTableSkeletonRows.map((rowIndex) => (
      <TableRow key={rowIndex}>
        {table.getAllLeafColumns().map((column) => (
          <TableCell key={column.id}>
            <Skeleton animation="wave" width="75%" />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);

export default EcoTableSkeletonBody;
