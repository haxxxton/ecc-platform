import {
  actionRequiredLabels,
  statusKeywords,
  workflowActions,
  workflowStageCodes,
} from '../constants';
import type { Eco, WorkflowAction } from '../types';
import { isCompleteStatus, normalizeStatus } from './ecoStatus';

export type WorkflowActionAvailability = {
  enabled: boolean;
  disabledReason?: string;
};

const completedReason = 'Completed ECOs cannot be progressed.';
const alreadyRejectedReason = 'This ECO has already been rejected.';

function isCompletedEco(eco: Eco) {
  return isCompleteStatus(eco.EccStatus) || eco.StatusCode === workflowStageCodes.closed;
}

function isRejectedEco(eco: Eco) {
  const actionRequired = normalizeStatus(eco.ActionReqd);
  const status = normalizeStatus(eco.EccStatus);
  return (
    actionRequired.includes(normalizeStatus(actionRequiredLabels.rejected)) ||
    status.includes(statusKeywords.reject)
  );
}

export function getWorkflowActionAvailability(
  eco: Eco,
): Record<WorkflowAction, WorkflowActionAvailability> {
  if (isCompletedEco(eco)) {
    const unavailable = { enabled: false, disabledReason: completedReason };
    return {
      [workflowActions.approved]: unavailable,
      [workflowActions.rejected]: unavailable,
      [workflowActions.changesRequested]: unavailable,
    };
  }

  return {
    [workflowActions.approved]: { enabled: true },
    [workflowActions.rejected]: isRejectedEco(eco)
      ? { enabled: false, disabledReason: alreadyRejectedReason }
      : { enabled: true },
    [workflowActions.changesRequested]: { enabled: true },
  };
}

export function assertWorkflowActionAllowed(eco: Eco, action: WorkflowAction) {
  const availability = getWorkflowActionAvailability(eco)[action];
  if (!availability.enabled) {
    throw new Error(availability.disabledReason);
  }
}
