import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Button, Stack, TableCell, TableRow } from '@mui/material';
import type { EditableDetailRowProps } from '../types';

const EditableDetailRow = ({ actionLabel, label, value, onEdit }: EditableDetailRowProps) => (
  <TableRow>
    <TableCell sx={{ width: 185, fontWeight: 850 }}>{label}</TableCell>
    <TableCell>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        sx={{
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
        }}
      >
        {value}
        <Button size="small" startIcon={<EditOutlinedIcon />} onClick={onEdit}>
          {actionLabel}
        </Button>
      </Stack>
    </TableCell>
  </TableRow>
);

export default EditableDetailRow;
