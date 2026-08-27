import type { Eco, WorkflowAction } from '../../types';
import { ecoDetailEditors, ecoDetailSections } from './constants';

export type EcoDetailSection = (typeof ecoDetailSections)[keyof typeof ecoDetailSections];
export type EcoDetailEditor = (typeof ecoDetailEditors)[keyof typeof ecoDetailEditors];

export type EcoDetailDrawerProps = {
  eco?: Eco;
  open: boolean;
  userOptions: string[];
  onClose: () => void;
  onAssign: (eco: Eco, assignedTo: string) => void;
  onPriority: (eco: Eco, priority: string) => void;
  onWorkflowAction: (eco: Eco, action: WorkflowAction, comment?: string) => Eco | Promise<Eco>;
  onAddAttachments: (eco: Eco, files: File[]) => void;
};
