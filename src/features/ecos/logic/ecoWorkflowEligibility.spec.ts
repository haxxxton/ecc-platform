import { describe, expect, it } from 'vitest';
import {
  actionRequiredLabels,
  ecoStatuses,
  workflowActions,
  workflowStageCodes,
} from '../constants';
import type { Eco } from '../types';
import {
  assertWorkflowActionAllowed,
  getWorkflowActionAvailability,
} from './ecoWorkflowEligibility';

const activeEco = {
  ChangeOrder: '26200',
  EccStatus: ecoStatuses.inProgress,
  StatusCode: workflowStageCodes.review,
} satisfies Eco;

describe('getWorkflowActionAvailability', () => {
  it('disables every workflow action for a completed ECO', () => {
    const availability = getWorkflowActionAvailability({
      ...activeEco,
      EccStatus: ecoStatuses.complete,
    });

    expect(Object.values(availability).every(({ enabled }) => !enabled)).toBe(true);
  });

  it('only disables rejection for an ECO that is currently rejected', () => {
    const availability = getWorkflowActionAvailability({
      ...activeEco,
      ActionReqd: actionRequiredLabels.rejected,
    });

    expect(availability[workflowActions.approved].enabled).toBe(true);
    expect(availability[workflowActions.rejected].enabled).toBe(false);
    expect(availability[workflowActions.changesRequested].enabled).toBe(true);
  });

  it('recognizes a rejected backend status', () => {
    const availability = getWorkflowActionAvailability({ ...activeEco, EccStatus: 'REJECTED' });

    expect(availability[workflowActions.rejected].enabled).toBe(false);
  });
});

describe('assertWorkflowActionAllowed', () => {
  it('rejects a second rejection', () => {
    expect(() =>
      assertWorkflowActionAllowed(
        { ...activeEco, ActionReqd: actionRequiredLabels.rejected },
        workflowActions.rejected,
      ),
    ).toThrow('already been rejected');
  });
});
