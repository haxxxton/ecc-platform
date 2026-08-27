import type { ScopeTabDefinition } from './types';

export const scopeTabDefinitions: ScopeTabDefinition[] = [
  { scope: 'active', getCount: (metrics) => metrics.active.length },
  { scope: 'draft', getCount: (metrics) => metrics.drafts.length },
  { scope: 'high', getCount: (metrics) => metrics.high.length },
  {
    scope: 'signoff',
    highlightWhenNonZero: true,
    getCount: (metrics) => metrics.signoff.length,
  },
  { scope: 'new', getCount: (metrics) => metrics.newRequests.length },
  {
    scope: 'overdue',
    highlightWhenNonZero: true,
    getCount: (metrics) => metrics.overdue90.length,
  },
  {
    scope: 'critical',
    highlightWhenNonZero: true,
    getCount: (metrics) => metrics.critical.length,
  },
  {
    scope: 'unassigned',
    highlightWhenNonZero: true,
    getCount: (metrics) => metrics.unassigned.length,
  },
];
