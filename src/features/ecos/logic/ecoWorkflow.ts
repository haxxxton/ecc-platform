import {
  actionRequiredLabels,
  ecoStatuses,
  workflowActions,
  workflowStageCodes,
} from '../constants';
import type { Eco, WorkflowAction } from '../types';
import { getApprovalDestination } from './ecoWorkflowDestination';
import { assertWorkflowActionAllowed } from './ecoWorkflowEligibility';

type WorkflowUpdateOptions = {
  userName: string;
  comment?: string;
};

export function applyWorkflowAction(
  eco: Eco,
  action: WorkflowAction,
  options: WorkflowUpdateOptions,
): Eco {
  assertWorkflowActionAllowed(eco, action);
  const now = new Date().toISOString();
  const history = [...(eco.SignoffHistory ?? [])];
  const next: Eco = {
    ...eco,
    SignoffHistory: history,
  };

  switch (action) {
    case workflowActions.approved: {
      const destination = getApprovalDestination(eco.StatusCode);
      next.StatusCode = destination.stageCode;
      if (destination.stageCode !== workflowStageCodes.closed) {
        next.ActionReqd = `Moved To ${next.StatusCode}`;
        next.EccStatus = ecoStatuses.inProgress;
      } else {
        next.EccStatus = ecoStatuses.complete;
        next.ActionReqd = actionRequiredLabels.workflowComplete;
        next.CompletedDate = now;
      }
      next.ApprovedBy = options.userName;
      next.ApprovedDate = now;
      break;
    }
    case workflowActions.rejected:
      next.EccStatus = ecoStatuses.onHold;
      next.ActionReqd = actionRequiredLabels.rejected;
      next.RejectedBy = options.userName;
      next.RejectedDate = now;
      break;
    case workflowActions.changesRequested:
      next.ActionReqd = actionRequiredLabels.changesRequested;
      break;
  }

  history.push({
    User: options.userName,
    Action: action,
    Date: now,
    Comment: options.comment,
  });

  return next;
}
