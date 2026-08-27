import type { z } from 'zod';
import type { ecoPrioritySchema, knownEcoStatusSchema, workflowActionSchema } from './schemas';

export type KnownEcoStatus = z.infer<typeof knownEcoStatusSchema>;
export type EcoStatus = KnownEcoStatus | (string & {});
export type EcoPriority = z.infer<typeof ecoPrioritySchema> | (string & {});

export type PriorityAssessment = {
  ProductImpact?: number | string;
  CustomerImpact?: number | string;
  CostImpact?: number | string;
  RegulatoryCompliance?: number | string;
  ImplementationEffort?: number | string;
  ScheduleImpact?: number | string;
};

export type EcoAttachment = {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  url?: string;
  uploadedAt: string;
  uploadedBy: string;
};

export type SignoffHistoryEntry = {
  User: string;
  Action: string;
  Date: string;
  Comment?: string;
};

export type Eco = {
  ChangeOrder: string;
  Description?: string;
  Category?: string;
  CategoryState?: string;
  Originator?: string;
  EccUser?: string;
  StatusCode?: string;
  ActionReqd?: string;
  EccStatus?: EcoStatus;
  Priority?: EcoPriority;
  DateRaised?: string;
  BomMaintAllow?: string;
  AuditSequence?: string;
  FullDescription?: string;
  Reason?: string;
  Notes?: string;
  ClaimedBy?: string;
  AgeDays?: number;
  Attachments?: EcoAttachment[];
  SignoffHistory?: SignoffHistoryEntry[];
  ApprovedBy?: string;
  ApprovedDate?: string;
  RejectedBy?: string;
  RejectedDate?: string;
  CompletedDate?: string;
  PriorityScore?: number | string;
  PriorityAssessment?: PriorityAssessment;
};

export type EcoFilters = {
  search: string;
  category: string;
  owner: string;
  assignedTo: string;
  priority: string;
  stage: string;
  status: string;
  actionRequired: string;
};

export type EcoScope =
  'active' | 'draft' | 'high' | 'signoff' | 'new' | 'overdue' | 'critical' | 'unassigned';

export type CurrentUser = {
  id: string;
  displayName: string;
  roles: string[];
};

export type CreateEcoInput = {
  Description: string;
  Category: string;
  CategoryState: string;
  Originator: string;
  EccUser: string;
  Priority: string;
  PriorityScore?: string;
  PriorityAssessment?: PriorityAssessment;
  Reason: string;
  FullDescription: string;
  Notes?: string;
};

export type WorkflowAction = z.infer<typeof workflowActionSchema>;
