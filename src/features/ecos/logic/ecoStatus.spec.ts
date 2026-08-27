import { describe, expect, it } from 'vitest';
import { ecoStatuses, unknownOption } from '../constants';
import { getStatusChipPresentation, isCompleteStatus, isDraftStatus } from './ecoStatus';

describe('ecoStatus', () => {
  it('identifies known lifecycle statuses', () => {
    expect(isDraftStatus(ecoStatuses.draft)).toBe(true);
    expect(isCompleteStatus(ecoStatuses.complete)).toBe(true);
    expect(isCompleteStatus(ecoStatuses.inProgress)).toBe(false);
  });

  it('maps status values to chip presentation', () => {
    expect(getStatusChipPresentation(ecoStatuses.complete)).toMatchObject({
      label: ecoStatuses.complete,
      color: 'success',
    });
    expect(getStatusChipPresentation(ecoStatuses.new)).toMatchObject({ color: 'info' });
    expect(getStatusChipPresentation(ecoStatuses.onHold)).toMatchObject({ color: 'secondary' });
    expect(getStatusChipPresentation(ecoStatuses.inProgress)).toMatchObject({ color: 'warning' });
    expect(getStatusChipPresentation()).toMatchObject({
      label: unknownOption,
      color: 'default',
    });
  });
});
