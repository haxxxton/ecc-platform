import { Divider, Stack } from '@mui/material';
import DetailsTab from '../DetailsTab';
import StageGateAction from '../StageGateAction';
import type { OverviewTabProps } from '../types';

const OverviewTab = ({
  eco,
  onEditAssignment,
  onEditPriority,
  ...actionsProps
}: OverviewTabProps) => (
  <Stack spacing={3}>
    <DetailsTab eco={eco} onEditAssignment={onEditAssignment} onEditPriority={onEditPriority} />
    <Divider />
    <StageGateAction eco={eco} {...actionsProps} />
  </Stack>
);

export default OverviewTab;
