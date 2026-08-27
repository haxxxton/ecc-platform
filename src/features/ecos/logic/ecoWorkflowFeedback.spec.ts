import { describe, expect, it } from 'vitest';
import { ecoStatuses, workflowActions, workflowStageCodes } from '../constants';
import type { Eco } from '../types';
import { getWorkflowErrorMessage, getWorkflowSuccessMessage } from './ecoWorkflowFeedback';

const eco = {
  ChangeOrder: '000000000026200',
  EccStatus: ecoStatuses.inProgress,
  StatusCode: workflowStageCodes.drawing,
} satisfies Eco;

describe('workflow feedback', () => {
  it('describes the stage reached after approval', () => {
    expect(getWorkflowSuccessMessage(eco, workflowActions.approved)).toBe(
      'Approved - ECO 26200 moved to 03 - DWG stage',
    );
  });

  it('includes backend errors in contextual failure feedback', () => {
    expect(
      getWorkflowErrorMessage(new Error('Permission denied'), eco, workflowActions.rejected),
    ).toBe('Rejection failed - ECO 26200: Permission denied');
  });
});
