import { Alert, Box, Stack, TextField, Typography } from '@mui/material';
import { workflowActions } from '../../../../constants';
import { getApprovalActionLabel } from '../../../../logic/ecoWorkflowActionLabel';
import { getWorkflowActionAvailability } from '../../../../logic/ecoWorkflowEligibility';
import WorkflowActionButton from '../WorkflowActionButton';
import type { StageGateActionProps } from '../types';

const StageGateAction = ({
  comment,
  eco,
  isWorkflowActionPending,
  onCommentChange,
  onRunWorkflowAction,
}: StageGateActionProps) => {
  const availability = getWorkflowActionAvailability(eco);
  const noActionsReason = Object.values(availability).every(({ enabled }) => !enabled)
    ? availability[workflowActions.approved].disabledReason
    : undefined;

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Workflow actions
      </Typography>
      {noActionsReason && (
        <Alert severity="info" sx={{ mb: 1.5 }}>
          {noActionsReason}
        </Alert>
      )}
      <TextField
        disabled={Boolean(noActionsReason) || isWorkflowActionPending}
        fullWidth
        multiline
        minRows={2}
        label="Comment"
        value={comment}
        onChange={(event) => onCommentChange(event.target.value)}
        sx={{ mb: 1 }}
      />
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
        {Object.values(workflowActions).map((action) => (
          <WorkflowActionButton
            key={action}
            action={action}
            availability={availability[action]}
            isPending={isWorkflowActionPending}
            label={
              action === workflowActions.approved
                ? getApprovalActionLabel(eco.StatusCode)
                : undefined
            }
            onRunWorkflowAction={onRunWorkflowAction}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default StageGateAction;
