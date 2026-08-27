import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useAttachmentDropzone } from '../../../AttachmentDropzone/hooks/useAttachmentDropzone';
import { calculatePriorityScore } from '../../../../logic/ecoPriority';
import { createEcoFormSchema } from '../../constants';
import type { CreateEcoDialogProps, EcoFormValues } from '../../types';
import { getCreateEcoInputFromValues, getDialogTitle } from './logic';

export const useCreateEcoDialog = ({
  defaults,
  editingDraft,
  onClose,
  onSaveDraft,
  onSubmitEco,
}: Pick<
  CreateEcoDialogProps,
  'defaults' | 'editingDraft' | 'onClose' | 'onSaveDraft' | 'onSubmitEco'
>) => {
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm<EcoFormValues>({
    resolver: zodResolver(createEcoFormSchema),
    defaultValues: defaults,
  });
  const { control, handleSubmit, reset, setValue, formState } = form;
  const attachmentDropzone = useAttachmentDropzone({ files, onFilesChange: setFiles });

  useEffect(() => {
    reset(defaults);
  }, [defaults, reset]);

  const assessment = useWatch({
    control,
    name: [
      'ProductImpact',
      'CustomerImpact',
      'CostImpact',
      'RegulatoryCompliance',
      'ImplementationEffort',
      'ScheduleImpact',
    ],
  });

  const score = useMemo(
    () =>
      calculatePriorityScore({
        ProductImpact: assessment[0],
        CustomerImpact: assessment[1],
        CostImpact: assessment[2],
        RegulatoryCompliance: assessment[3],
        ImplementationEffort: assessment[4],
        ScheduleImpact: assessment[5],
      }),
    [assessment],
  );

  useEffect(() => {
    setValue('PriorityScore', score.toFixed(2), { shouldDirty: false });
  }, [score, setValue]);

  const closeWithCheck = () => {
    if (formState.isDirty && !window.confirm('Discard unsaved ECO form changes?')) return;
    setFiles([]);
    onClose();
  };

  const saveDraft = handleSubmit(async (values) => {
    await onSaveDraft(getCreateEcoInputFromValues(values), files, editingDraft);
    setFiles([]);
    onClose();
  });

  const submitEco = handleSubmit(async (values) => {
    await onSubmitEco(getCreateEcoInputFromValues(values), files, editingDraft);
    setFiles([]);
    onClose();
  });

  return {
    ...form,
    attachmentDropzone,
    files,
    setFiles,
    score,
    title: getDialogTitle(editingDraft),
    closeWithCheck,
    saveDraft,
    submitEco,
  };
};
