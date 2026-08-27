import { TableBody, TableCell, TableRow } from '@mui/material';
import type { EcoTableChildProps } from '../../types';

const EcoTableBody = ({ table, onOpenEco }: EcoTableChildProps) => (
  <TableBody>
    {table.getRowModel().rows.map((row) => (
      <TableRow
        hover
        tabIndex={0}
        key={row.id}
        onClick={() => onOpenEco(row.original)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onOpenEco(row.original);
          }
        }}
        sx={{ cursor: 'pointer' }}
      >
        {row.getAllCells().map((cell) => (
          <TableCell key={cell.id}>
            <table.FlexRender cell={cell} />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);

export default EcoTableBody;
