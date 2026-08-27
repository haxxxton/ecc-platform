import { workflowActions } from '../constants';
import type { Eco, WorkflowAction } from '../types';
import { formatEcoNumber } from './ecoIdentifiers';
import { isCompleteStatus } from './ecoStatus';

const workflowActionLabels: Record<WorkflowAction, string> = {
  [workflowActions.approved]: 'Approval',
  [workflowActions.rejected]: 'Rejection',
  [workflowActions.changesRequested]: 'Change request',
};

export function getWorkflowSuccessMessage(eco: Eco, action: WorkflowAction) {
  const ecoNumber = formatEcoNumber(eco.ChangeOrder);

  switch (action) {
    case workflowActions.approved:
      if (isCompleteStatus(eco.EccStatus)) return `Approved - ECO ${ecoNumber} completed`;
      return `Approved - ECO ${ecoNumber} moved to ${eco.StatusCode} stage`;
    case workflowActions.rejected:
      return `Rejected - ECO ${ecoNumber} placed on hold`;
    case workflowActions.changesRequested:
      return `Changes requested - ECO ${ecoNumber} remains at ${eco.StatusCode} stage`;
  }
}

export function getWorkflowErrorMessage(error: unknown, eco: Eco, action: WorkflowAction) {
  const ecoNumber = formatEcoNumber(eco.ChangeOrder);
  const detail = error instanceof Error ? error.message : 'The ECO was not updated.';
  return `${workflowActionLabels[action]} failed - ECO ${ecoNumber}: ${detail}`;
}
