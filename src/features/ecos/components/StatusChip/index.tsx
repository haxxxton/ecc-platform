import { Chip } from '@mui/material';
import { getStatusChipPresentation } from '../../logic/ecoStatus';
import type { StatusChipProps } from './types';

const StatusChip = ({ status }: StatusChipProps) => {
  const chip = getStatusChipPresentation(status);

  return <Chip size="small" label={chip.label} color={chip.color} variant={chip.variant} />;
};

export default StatusChip;
