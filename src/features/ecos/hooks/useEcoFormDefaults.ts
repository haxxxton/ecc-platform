import { useMemo } from 'react';
import { categoryOptions, manufacturingSources } from '../constants';
import { getKnownPriorityOrDefault } from '../logic/ecoPriority';
import type { Eco } from '../types';

export function useEcoFormDefaults(draft?: Eco) {
  return useMemo(() => {
    return {
      Description: draft?.Description ?? '',
      Category: draft?.Category ?? categoryOptions[0],
      CategoryState: draft?.CategoryState ?? manufacturingSources[0],
      Originator: draft?.Originator ?? '',
      EccUser: draft?.EccUser ?? '',
      Priority: getKnownPriorityOrDefault(draft?.Priority),
      PriorityScore: String(draft?.PriorityScore ?? ''),
      ProductImpact: Number(draft?.PriorityAssessment?.ProductImpact ?? 1),
      CustomerImpact: Number(draft?.PriorityAssessment?.CustomerImpact ?? 1),
      CostImpact: Number(draft?.PriorityAssessment?.CostImpact ?? 1),
      RegulatoryCompliance: Number(draft?.PriorityAssessment?.RegulatoryCompliance ?? 1),
      ImplementationEffort: Number(draft?.PriorityAssessment?.ImplementationEffort ?? 1),
      ScheduleImpact: Number(draft?.PriorityAssessment?.ScheduleImpact ?? 1),
      Reason: draft?.Reason ?? '',
      FullDescription: draft?.FullDescription ?? '',
      Notes: draft?.Notes ?? '',
    };
  }, [draft]);
}
