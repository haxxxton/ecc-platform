import { allOption, ecoStatuses, unassignedOption } from '../constants';
import type { Eco, EcoFilters, EcoScope } from '../types';
import { getAgeDays, isActiveEco, isCompleteEco } from './ecoDates';
import { isHighPriority } from './ecoPriority';
import { isDraftStatus, normalizeStatus } from './ecoStatus';

function requiresFinalSignoff(eco: Eco) {
  return String(eco.ActionReqd ?? '').includes('Final');
}

export function uniqueOptions(ecos: Eco[], key: keyof Eco) {
  return [allOption, ...getUniqueEcoValues(ecos, key)];
}

export function getUniqueEcoValues(ecos: Eco[], key: keyof Eco) {
  return Array.from(new Set(ecos.map((eco) => String(eco[key] ?? '').trim()).filter(Boolean))).sort(
    (a, b) => a.localeCompare(b, undefined, { numeric: true }),
  );
}

export function assignedOptions(ecos: Eco[]) {
  return [
    allOption,
    unassignedOption,
    ...Array.from(new Set(ecos.map((eco) => eco.ClaimedBy ?? '').filter(Boolean))).sort(),
  ];
}

export function applyScope(ecos: Eco[], scope: EcoScope) {
  const active = ecos.filter((eco) => isActiveEco(eco));

  switch (scope) {
    case 'draft':
      return ecos.filter((eco) => isDraftStatus(eco.EccStatus));
    case 'high':
      return active.filter((eco) => isHighPriority(eco.Priority));
    case 'signoff':
      return active.filter(requiresFinalSignoff);
    case 'new':
      return active.filter((eco) => normalizeStatus(eco.EccStatus).includes(ecoStatuses.new));
    case 'overdue':
      return active.filter((eco) => !isCompleteEco(eco) && getAgeDays(eco) > 90);
    case 'critical':
      return active.filter((eco) => isHighPriority(eco.Priority) && getAgeDays(eco) > 180);
    case 'unassigned':
      return active.filter((eco) => !isCompleteEco(eco) && !eco.ClaimedBy);
    case 'active':
      return active;
  }
}

export function applyFilters(ecos: Eco[], filters: EcoFilters) {
  const search = filters.search.trim().toLowerCase();
  return ecos.filter((eco) => {
    const matchesSearch = !search || JSON.stringify(eco).toLowerCase().includes(search);
    const matchesCategory = filters.category === allOption || eco.Category === filters.category;
    const matchesOwner = filters.owner === allOption || eco.EccUser === filters.owner;
    const matchesAssigned =
      filters.assignedTo === allOption ||
      (filters.assignedTo === unassignedOption
        ? !eco.ClaimedBy
        : eco.ClaimedBy === filters.assignedTo);
    const matchesPriority = filters.priority === allOption || eco.Priority === filters.priority;
    const matchesStage = filters.stage === allOption || eco.StatusCode === filters.stage;
    const matchesStatus = filters.status === allOption || eco.EccStatus === filters.status;
    const matchesAction =
      filters.actionRequired === allOption || eco.ActionReqd === filters.actionRequired;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesOwner &&
      matchesAssigned &&
      matchesPriority &&
      matchesStage &&
      matchesStatus &&
      matchesAction
    );
  });
}
