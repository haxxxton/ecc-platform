import { describe, expect, it } from 'vitest';
import { workflowStageCodes } from '../constants';
import { getApprovalActionLabel } from './ecoWorkflowActionLabel';
import { getApprovalDestination } from './ecoWorkflowDestination';

describe('workflow approval destination', () => {
  it.each([
    [workflowStageCodes.request, workflowStageCodes.review, 'Move to Review'],
    [workflowStageCodes.review, workflowStageCodes.drawing, 'Move to Drawing'],
    [workflowStageCodes.drawing, workflowStageCodes.bom, 'Move to BOM'],
    [workflowStageCodes.bom, workflowStageCodes.confirm, 'Move to Confirmation'],
    [workflowStageCodes.confirm, workflowStageCodes.closed, 'Move to Complete'],
  ])('maps %s to its next stage', (currentStage, expectedStage, expectedLabel) => {
    expect(getApprovalDestination(currentStage).stageCode).toBe(expectedStage);
    expect(getApprovalActionLabel(currentStage)).toBe(expectedLabel);
  });

  it('matches the existing completion fallback for an unknown stage', () => {
    expect(getApprovalDestination('UNKNOWN').stageCode).toBe(workflowStageCodes.closed);
    expect(getApprovalActionLabel('UNKNOWN')).toBe('Move to Complete');
  });
});
