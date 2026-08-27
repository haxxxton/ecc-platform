import { Button, Tooltip } from '@mui/material';
import { workflowActionButtonPresentation } from './constants';
import type { WorkflowActionButtonProps } from './types';

const WorkflowActionButton = ({
  action,
  availability,
  isPending,
  label,
  onRunWorkflowAction,
}: WorkflowActionButtonProps) => {
  const presentation = workflowActionButtonPresentation[action];
  const buttonLabel = label ?? presentation.label;

  return (
    <Tooltip title={availability.disabledReason ?? buttonLabel}>
      <span>
        <Button
          color={presentation.color}
          disabled={isPending || !availability.enabled}
          startIcon={presentation.icon}
          variant={presentation.variant}
          onClick={() => onRunWorkflowAction(action)}
        >
          {buttonLabel}
        </Button>
      </span>
    </Tooltip>
  );
};

export default WorkflowActionButton;
