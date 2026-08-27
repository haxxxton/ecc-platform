import { getApprovalDestination } from './ecoWorkflowDestination';

export function getApprovalActionLabel(stageCode?: string) {
  return `Move to ${getApprovalDestination(stageCode).stageName}`;
}
