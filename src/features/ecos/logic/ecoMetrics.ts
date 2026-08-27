import { subDays, isAfter } from 'date-fns';
import { ecoStatuses, unknownOption } from '../constants';
import type { Eco } from '../types';
import { getAgeDays, getCompletionDate, isActiveEco, isCompleteEco } from './ecoDates';
import { isHighPriority, isLowPriority, isMediumPriority } from './ecoPriority';
import { isDraftStatus, normalizeStatus } from './ecoStatus';

export type CountDatum = {
  name: string;
  count: number;
};

export type PriorityCategoryDatum = {
  category: string;
  high: number;
  medium: number;
  low: number;
  completed30: number;
};

export function countBy(ecos: Eco[], getKey: (eco: Eco) => string | undefined) {
  return Object.entries(
    ecos.reduce<Record<string, number>>((acc, eco) => {
      const key = getKey(eco)?.trim() || unknownOption;
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getHealthLabel(healthScore: number) {
  if (healthScore >= 80) return 'Healthy';
  if (healthScore >= 60) return 'Watch';
  return 'At Risk';
}

export function buildMetrics(ecos: Eco[]) {
  const active = ecos.filter((eco) => isActiveEco(eco));
  const open = active.filter((eco) => !isCompleteEco(eco));
  const drafts = ecos.filter((eco) => isDraftStatus(eco.EccStatus));
  const now = new Date();
  const completed7 = active.filter(
    (eco) => isCompleteEco(eco) && isAfter(getCompletionDate(eco), subDays(now, 7)),
  );
  const completed31 = active.filter(
    (eco) => isCompleteEco(eco) && isAfter(getCompletionDate(eco), subDays(now, 31)),
  );
  const high = active.filter((eco) => isHighPriority(eco.Priority));
  const signoff = active.filter((eco) => String(eco.ActionReqd ?? '').includes('Final'));
  const newRequests = active.filter((eco) =>
    normalizeStatus(eco.EccStatus).includes(ecoStatuses.new),
  );
  const overdue90 = open.filter((eco) => getAgeDays(eco) > 90);
  const over180 = open.filter((eco) => getAgeDays(eco) > 180);
  const critical = open.filter((eco) => isHighPriority(eco.Priority) && getAgeDays(eco) > 180);
  const unassigned = open.filter((eco) => !eco.ClaimedBy);
  const ages = open.map((eco) => getAgeDays(eco));
  const averageAge = ages.length
    ? Math.round(ages.reduce((total, age) => total + age, 0) / ages.length)
    : 0;
  const oldestAge = ages.length ? Math.max(...ages) : 0;
  const healthScore = Math.max(
    0,
    Math.round(
      100 -
        Math.min(
          75,
          (overdue90.length / Math.max(open.length, 1)) * 35 +
            (unassigned.length / Math.max(open.length, 1)) * 20 +
            (signoff.length / Math.max(open.length, 1)) * 10 +
            (critical.length / Math.max(open.length, 1)) * 10,
        ),
    ),
  );

  return {
    active,
    open,
    drafts,
    completed7,
    completed31,
    high,
    signoff,
    newRequests,
    overdue90,
    over180,
    critical,
    unassigned,
    averageAge,
    oldestAge,
    healthScore,
    healthLabel: getHealthLabel(healthScore),
    byStage: countBy(
      open,
      (eco) => String(eco.StatusCode ?? unknownOption).split(' - ')[1] ?? eco.StatusCode,
    ),
    byOwner: countBy(open, (eco) => eco.EccUser).slice(0, 10),
    byCategory: countBy(open, (eco) => eco.Category),
    priorityByCategory: buildPriorityByCategory(active),
  };
}

function buildPriorityByCategory(ecos: Eco[]): PriorityCategoryDatum[] {
  const categories = Array.from(new Set(ecos.map((eco) => eco.Category ?? unknownOption))).sort();
  return categories.map((category) => {
    const categoryEcos = ecos.filter((eco) => (eco.Category ?? unknownOption) === category);
    return {
      category,
      high: categoryEcos.filter((eco) => isHighPriority(eco.Priority)).length,
      medium: categoryEcos.filter((eco) => isMediumPriority(eco.Priority)).length,
      low: categoryEcos.filter((eco) => isLowPriority(eco.Priority)).length,
      completed30: categoryEcos.filter((eco) => isCompleteEco(eco)).length,
    };
  });
}
