import type { Eco, WorkflowAction } from '../../../types';
import type { ReactNode } from 'react';

export type AssignmentDialogProps = {
  assignedTo: string;
  open: boolean;
  userOptions: string[];
  onAssignedToChange: (value: string) => void;
  onCancel: () => void;
  onSaveAssignment: () => void;
};

export type AttachmentsTabProps = {
  eco: Eco;
  files: File[];
  onAttachFiles: () => void;
  onFilesChange: (files: File[]) => void;
};

export type AuditTabProps = {
  eco: Eco;
};

export type DetailsTabProps = {
  eco: Eco;
  onEditAssignment: () => void;
  onEditPriority: () => void;
};

export type EcoDetailHeaderProps = {
  eco: Eco;
  onClose: () => void;
};

export type EditableDetailRowProps = {
  actionLabel: string;
  label: string;
  value: ReactNode;
  onEdit: () => void;
};

export type PriorityDialogProps = {
  open: boolean;
  priority: string;
  onCancel: () => void;
  onPriorityChange: (value: string) => void;
  onSavePriority: () => void;
};

export type StageGateActionProps = {
  comment: string;
  eco: Eco;
  isWorkflowActionPending: boolean;
  onCommentChange: (value: string) => void;
  onRunWorkflowAction: (action: WorkflowAction) => void;
};

export type OverviewTabProps = StageGateActionProps & DetailsTabProps;
