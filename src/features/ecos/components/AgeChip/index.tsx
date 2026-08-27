import { Chip } from '@mui/material';
import { getAgeChipPresentation } from '../../logic/ecoAge';
import type { AgeChipProps } from './types';

const AgeChip = ({ eco }: AgeChipProps) => {
  const chip = getAgeChipPresentation(eco);

  return <Chip size="small" label={chip.label} color={chip.color} variant={chip.variant} />;
};

export default AgeChip;
