import type { Control, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import type { FileRejection } from 'react-dropzone';
import type { Eco } from '../../../types';
import type { EcoFormValues } from '../types';

export type CoreEcoFieldsProps = {
  control: Control<EcoFormValues>;
  errors: FieldErrors<EcoFormValues>;
  ownerOptions: string[];
  register: UseFormRegister<EcoFormValues>;
};

export type CreateEcoDialogActionsProps = {
  editingDraft?: Eco;
  isSubmitting: boolean;
  onClose: () => void;
  onSaveDraft: () => void;
  onSubmitEco: () => void;
  onDeleteDraft: (ecoId: string) => void;
};

export type CreateEcoDialogHeaderProps = {
  title: string;
  onClose: () => void;
};

export type CreateEcoFormFieldsProps = {
  control: Control<EcoFormValues>;
  errors: FieldErrors<EcoFormValues>;
  fileRejections: readonly FileRejection[];
  files: File[];
  isDragActive: boolean;
  onBrowseFiles: () => void;
  ownerOptions: string[];
  register: UseFormRegister<EcoFormValues>;
  score: number;
  setFiles: (files: File[]) => void;
  setValue: UseFormSetValue<EcoFormValues>;
};

export type EcoNarrativeFieldsProps = {
  errors: FieldErrors<EcoFormValues>;
  fileRejections: readonly FileRejection[];
  files: File[];
  isDragActive: boolean;
  onBrowseFiles: () => void;
  register: UseFormRegister<EcoFormValues>;
  setFiles: (files: File[]) => void;
};

export type PriorityAssessmentFieldsProps = {
  control: Control<EcoFormValues>;
  score: number;
  setValue: UseFormSetValue<EcoFormValues>;
};
