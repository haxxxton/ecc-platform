import type { Eco, WorkflowAction } from '../../../../types';
import type { EcoDetailEditor, EcoDetailSection } from '../../types';

export type UseEcoDetailDrawerArgs = {
  eco?: Eco;
  onAssign: (eco: Eco, assignedTo: string) => void;
  onPriority: (eco: Eco, priority: string) => void;
  onWorkflowAction: (eco: Eco, action: WorkflowAction, comment?: string) => Eco | Promise<Eco>;
  onAddAttachments: (eco: Eco, files: File[]) => void;
};

export type KeyedState<T> = {
  ecoId: string;
  value: T;
};

export type EcoDetailSectionState = KeyedState<EcoDetailSection>;
export type EcoDetailEditorState = KeyedState<EcoDetailEditor | null>;
