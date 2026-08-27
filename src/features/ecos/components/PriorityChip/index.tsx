import { Chip } from '@mui/material';
import { getPriorityChipPresentation } from '../../logic/ecoPriority';
import type { PriorityChipProps } from './types';

const PriorityChip = ({ priority }: PriorityChipProps) => {
  const chip = getPriorityChipPresentation(priority);

  return <Chip size="small" label={chip.label} color={chip.color} variant={chip.variant} />;
};

export default PriorityChip;
