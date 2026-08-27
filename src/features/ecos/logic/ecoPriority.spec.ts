import { describe, expect, it } from 'vitest';
import { ecoPriorities } from '../constants';
import { calculatePriorityScore, priorityFromScore } from './ecoPriority';

describe('ecoPriority', () => {
  it('calculates weighted priority scores and labels', () => {
    const score = calculatePriorityScore({
      ProductImpact: 5,
      CustomerImpact: 4,
      CostImpact: 3,
      RegulatoryCompliance: 2,
      ImplementationEffort: 1,
      ScheduleImpact: 1,
    });

    expect(score).toBe(3.25);
    expect(priorityFromScore(score)).toBe(ecoPriorities.medium);
    expect(priorityFromScore(4)).toBe(ecoPriorities.high);
    expect(priorityFromScore(1.9)).toBe(ecoPriorities.low);
  });
});
