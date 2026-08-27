import { describe, expect, it } from 'vitest';
import { ecoPriorities, ecoStatuses, unassignedOption } from '../constants';
import { getAgeChipPresentation } from './ecoAge';
import { getAssignmentChipPresentation } from './ecoAssignment';
import { getPriorityChipPresentation } from './ecoPriority';

describe('eco chip presentation', () => {
  it('maps assignment state without JSX conditionals', () => {
    expect(getAssignmentChipPresentation('Alex')).toMatchObject({
      label: 'Alex',
      color: 'primary',
      variant: 'filled',
    });
    expect(getAssignmentChipPresentation()).toMatchObject({
      label: unassignedOption,
      color: 'default',
      variant: 'outlined',
    });
  });

  it('maps priorities to stable chip colors', () => {
    expect(getPriorityChipPresentation(ecoPriorities.high)).toMatchObject({ color: 'error' });
    expect(getPriorityChipPresentation(ecoPriorities.medium)).toMatchObject({ color: 'warning' });
    expect(getPriorityChipPresentation(ecoPriorities.low)).toMatchObject({ color: 'success' });
    expect(getPriorityChipPresentation()).toMatchObject({
      label: unassignedOption,
      color: 'default',
    });
  });

  it('maps ECO age bands to chip presentation', () => {
    expect(
      getAgeChipPresentation({ ChangeOrder: '1', EccStatus: ecoStatuses.draft }),
    ).toMatchObject({
      label: 'Draft',
      variant: 'outlined',
    });
    expect(
      getAgeChipPresentation({ ChangeOrder: '2', EccStatus: ecoStatuses.complete }),
    ).toMatchObject({
      label: 'Complete',
      color: 'success',
    });
    expect(getAgeChipPresentation({ ChangeOrder: '3', AgeDays: 181 })).toMatchObject({
      label: '181d',
      color: 'error',
      variant: 'filled',
    });
    expect(getAgeChipPresentation({ ChangeOrder: '4', AgeDays: 45 })).toMatchObject({
      label: '45d',
      color: 'default',
      variant: 'outlined',
    });
  });
});
