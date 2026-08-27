import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import AssignmentChip from '../../../AssignmentChip';
import PriorityChip from '../../../PriorityChip';
import EditableDetailRow from '../EditableDetailRow';
import { getDetailsRows } from './logic';
import type { DetailsTabProps } from '../types';

const DetailsTab = ({ eco, onEditAssignment, onEditPriority }: DetailsTabProps) => (
  <Table size="small">
    <TableBody>
      <EditableDetailRow
        actionLabel="Change assigned user"
        label="Assigned user"
        value={<AssignmentChip assignedTo={eco.ClaimedBy} />}
        onEdit={onEditAssignment}
      />
      <EditableDetailRow
        actionLabel="Change priority"
        label="Priority"
        value={<PriorityChip priority={eco.Priority} />}
        onEdit={onEditPriority}
      />
      {getDetailsRows(eco).map(([label, value]) => (
        <TableRow key={label}>
          <TableCell sx={{ width: 185, fontWeight: 850 }}>{label}</TableCell>
          <TableCell sx={{ whiteSpace: 'pre-wrap' }}>{value || '-'}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default DetailsTab;
