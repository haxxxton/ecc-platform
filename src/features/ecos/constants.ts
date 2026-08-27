import type { EcoFilters, EcoScope } from './types';
import { ecoPriorityValues, knownEcoStatusValues, workflowActionValues } from './schemas';

export const allOption = 'All';
export const unassignedOption = 'Unassigned';
export const unknownOption = 'Unknown';

export const ecoScopeLabels: Record<EcoScope, string> = {
  active: 'Active ECOs',
  draft: 'Draft ECOs',
  high: 'High Priority',
  signoff: 'Awaiting Signoff',
  new: 'New Requests',
  overdue: 'Open 90+ Days',
  critical: 'Critical High + 180 Days',
  unassigned: 'Unassigned',
};

export const ecoStatuses = {
  new: knownEcoStatusValues[0],
  inProgress: knownEcoStatusValues[1],
  complete: knownEcoStatusValues[2],
  onHold: knownEcoStatusValues[3],
  draft: knownEcoStatusValues[4],
} as const;

export const ecoPriorities = {
  high: ecoPriorityValues[0],
  medium: ecoPriorityValues[1],
  low: ecoPriorityValues[2],
} as const;

export const priorityKeywords = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
} as const;

export const statusKeywords = {
  hold: 'HOLD',
  reject: 'REJECT',
  progress: 'PROGRESS',
} as const;

export const workflowActions = {
  approved: workflowActionValues[0],
  rejected: workflowActionValues[1],
  changesRequested: workflowActionValues[2],
} as const;

export const workflowStageCodes = {
  draft: '00 - DRAFT',
  request: '01 - REQUEST',
  review: '02 - REVIEW',
  drawing: '03 - DWG',
  bom: '04 - BOM',
  confirm: '05 - CONFIRM',
  closed: 'CLOSED',
} as const;

export const actionRequiredLabels = {
  continueDraft: 'Continue Draft',
  signOnRequired: 'Sign On Required',
  rejected: 'Rejected',
  changesRequested: 'Changes Requested',
  workflowComplete: 'Workflow Complete',
} as const;

export const auditActions = {
  draftSaved: 'DRAFT SAVED',
  ecoSubmitted: 'ECO SUBMITTED',
  assignedToUpdated: 'ASSIGNED TO UPDATED',
  assignedToCleared: 'ASSIGNED TO CLEARED',
  priorityUpdated: 'PRIORITY UPDATED',
  attachmentsAdded: 'ATTACHMENTS ADDED',
} as const;

export const emptyFilters: EcoFilters = {
  search: '',
  category: allOption,
  owner: allOption,
  assignedTo: allOption,
  priority: allOption,
  stage: allOption,
  status: allOption,
  actionRequired: allOption,
};

export const priorityOptions = [...ecoPriorityValues];

export const categoryOptions = [
  'Northstar Industrial',
  'Northstar Digital',
  'Northstar Projects',
  'Northstar Secure',
];

export const manufacturingSources = [
  'North Hub Manufacturing',
  'South Hub Manufacturing',
  'East Hub Manufacturing',
  'External Partner',
];
