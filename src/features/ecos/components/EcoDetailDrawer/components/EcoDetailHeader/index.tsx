import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import AgeChip from '../../../AgeChip';
import AssignmentChip from '../../../AssignmentChip';
import PriorityChip from '../../../PriorityChip';
import StatusChip from '../../../StatusChip';
import { formatEcoNumber } from '../../../../logic/ecoIdentifiers';
import type { EcoDetailHeaderProps } from '../types';

const EcoDetailHeader = ({ eco, onClose }: EcoDetailHeaderProps) => (
  <Box sx={{ p: 2.5 }}>
    <Stack
      direction="row"
      sx={{ alignItems: 'flex-start', gap: 2, justifyContent: 'space-between' }}
    >
      <Box>
        <Typography variant="h2">ECO {formatEcoNumber(eco.ChangeOrder)}</Typography>
        <Typography variant="body2" color="text.secondary">
          {eco.Description || 'Untitled ECO'}
        </Typography>
      </Box>
      <IconButton onClick={onClose} aria-label="Close ECO detail drawer">
        <CloseIcon />
      </IconButton>
    </Stack>
    <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, mt: 2 }}>
      <StatusChip status={eco.EccStatus} />
      <PriorityChip priority={eco.Priority} />
      <AssignmentChip assignedTo={eco.ClaimedBy} />
      <AgeChip eco={eco} />
    </Stack>
  </Box>
);

export default EcoDetailHeader;
