import { ecoPriorities, priorityKeywords, unassignedOption } from '../constants';
import { ecoPrioritySchema } from '../schemas';
import type { ChipPresentation } from '../components/types';
import type { PriorityAssessment } from '../types';

export function calculatePriorityScore(assessment: PriorityAssessment) {
  const product = Number(assessment.ProductImpact ?? 1);
  const customer = Number(assessment.CustomerImpact ?? 1);
  const cost = Number(assessment.CostImpact ?? 1);
  const compliance = Number(assessment.RegulatoryCompliance ?? 1);
  const effort = Number(assessment.ImplementationEffort ?? 1);
  const schedule = Number(assessment.ScheduleImpact ?? 1);
  return (
    Math.round(
      (product * 0.3 +
        customer * 0.2 +
        cost * 0.15 +
        compliance * 0.15 +
        effort * 0.1 +
        schedule * 0.1) *
        100,
    ) / 100
  );
}

export function priorityFromScore(score: number) {
  if (score >= 4) return ecoPriorities.high;
  if (score >= 2) return ecoPriorities.medium;
  return ecoPriorities.low;
}

export function getKnownPriorityOrDefault(priority?: string) {
  const result = ecoPrioritySchema.safeParse(priority);
  return result.success ? result.data : ecoPriorities.medium;
}

export function isHighPriority(priority?: string) {
  return String(priority ?? '').includes(priorityKeywords.high);
}

export function isMediumPriority(priority?: string) {
  return String(priority ?? '').includes(priorityKeywords.medium);
}

export function isLowPriority(priority?: string) {
  return String(priority ?? '').includes(priorityKeywords.low);
}

export function getPriorityChipPresentation(priority?: string): ChipPresentation {
  if (!priority) {
    return { label: unassignedOption, color: 'default' };
  }

  if (isHighPriority(priority)) {
    return { label: priority, color: 'error' };
  }

  if (isMediumPriority(priority)) {
    return { label: priority, color: 'warning' };
  }

  return { label: priority, color: 'success' };
}
