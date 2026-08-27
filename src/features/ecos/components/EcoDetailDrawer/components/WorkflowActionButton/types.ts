import type { WorkflowActionAvailability } from '../../../../logic/ecoWorkflowEligibility';
import type { WorkflowAction } from '../../../../types';

export type WorkflowActionButtonProps = {
  action: WorkflowAction;
  availability: WorkflowActionAvailability;
  isPending: boolean;
  label?: string;
  onRunWorkflowAction: (action: WorkflowAction) => void;
};
