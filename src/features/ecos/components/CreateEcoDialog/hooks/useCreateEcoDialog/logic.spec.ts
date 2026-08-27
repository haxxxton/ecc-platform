import { describe, expect, it } from 'vitest';
import { ecoPriorities } from '../../../../constants';
import type { EcoFormValues } from '../../types';
import { getCreateEcoInputFromValues } from './logic';

const values: EcoFormValues = {
  Description: 'Updated enclosure',
  Category: 'Northstar Industrial',
  CategoryState: 'North Hub Manufacturing',
  Originator: 'Northstar Workflow',
  EccUser: 'Avery Rowan',
  Priority: ecoPriorities.medium,
  PriorityScore: '2.40',
  ProductImpact: 2,
  CustomerImpact: 3,
  CostImpact: 2,
  RegulatoryCompliance: 1,
  ImplementationEffort: 4,
  ScheduleImpact: 2,
  Reason: 'Improve assembly',
  FullDescription: 'Change the mounting arrangement.',
  Notes: '',
};

describe('getCreateEcoInputFromValues', () => {
  it('omits the backend-owned ECO identifier', () => {
    const input = getCreateEcoInputFromValues(values);

    expect(input).not.toHaveProperty('ChangeOrder');
    expect(input.Description).toBe(values.Description);
  });
});
