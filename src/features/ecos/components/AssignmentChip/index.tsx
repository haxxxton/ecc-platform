import { Chip } from '@mui/material';
import { getAssignmentChipPresentation } from '../../logic/ecoAssignment';
import type { AssignmentChipProps } from './types';

const AssignmentChip = ({ assignedTo }: AssignmentChipProps) => {
  const chip = getAssignmentChipPresentation(assignedTo);

  return <Chip size="small" label={chip.label} color={chip.color} variant={chip.variant} />;
};

export default AssignmentChip;
