import type { Eco, CreateEcoInput } from '../../types';
import type { z } from 'zod';
import { createEcoFormSchema } from './constants';

export type EcoFormValues = z.infer<typeof createEcoFormSchema>;

export type CreateEcoDialogProps = {
  open: boolean;
  defaults: EcoFormValues;
  ownerOptions: string[];
  editingDraft?: Eco;
  onClose: () => void;
  onSaveDraft: (input: CreateEcoInput, files: File[], existing?: Eco) => Promise<void>;
  onSubmitEco: (input: CreateEcoInput, files: File[], existing?: Eco) => Promise<void>;
  onDeleteDraft: (ecoId: string) => void;
};
