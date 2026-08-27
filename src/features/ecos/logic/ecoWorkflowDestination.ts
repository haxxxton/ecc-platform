import { workflowStageCodes } from '../constants';

export function getApprovalDestination(stageCode?: string) {
  switch (stageCode) {
    case workflowStageCodes.request:
      return { stageCode: workflowStageCodes.review, stageName: 'Review' };
    case workflowStageCodes.review:
      return { stageCode: workflowStageCodes.drawing, stageName: 'Drawing' };
    case workflowStageCodes.drawing:
      return { stageCode: workflowStageCodes.bom, stageName: 'BOM' };
    case workflowStageCodes.bom:
      return { stageCode: workflowStageCodes.confirm, stageName: 'Confirmation' };
    case workflowStageCodes.confirm:
    default:
      return { stageCode: workflowStageCodes.closed, stageName: 'Complete' };
  }
}
