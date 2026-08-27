import { useState } from 'react';
import { ecoPriorities } from '../../../../constants';
import { getKnownPriorityOrDefault } from '../../../../logic/ecoPriority';
import {
  getWorkflowErrorMessage,
  getWorkflowSuccessMessage,
} from '../../../../logic/ecoWorkflowFeedback';
import type { WorkflowAction } from '../../../../types';
import { useToastNotification } from '../useToastNotification';
import { ecoDetailEditors, ecoDetailSections } from '../../constants';
import type { EcoDetailSection } from '../../types';
import type {
  EcoDetailEditorState,
  EcoDetailSectionState,
  KeyedState,
  UseEcoDetailDrawerArgs,
} from './types';

export const useEcoDetailDrawer = ({
  eco,
  onAssign,
  onPriority,
  onWorkflowAction,
  onAddAttachments,
}: UseEcoDetailDrawerArgs) => {
  const [sectionState, setSectionState] = useState<EcoDetailSectionState>({
    ecoId: '',
    value: ecoDetailSections.overview,
  });
  const [editorState, setEditorState] = useState<EcoDetailEditorState>({
    ecoId: '',
    value: null,
  });
  const [assignedState, setAssignedState] = useState<KeyedState<string>>({ ecoId: '', value: '' });
  const [priorityState, setPriorityState] = useState<KeyedState<string>>({
    ecoId: '',
    value: ecoPriorities.medium,
  });
  const [commentState, setCommentState] = useState<KeyedState<string>>({ ecoId: '', value: '' });
  const [fileState, setFileState] = useState<KeyedState<File[]>>({ ecoId: '', value: [] });
  const [isWorkflowActionPending, setIsWorkflowActionPending] = useState(false);
  const toast = useToastNotification();
  const ecoId = eco?.ChangeOrder ?? '';
  const assignedTo = assignedState.ecoId === ecoId ? assignedState.value : (eco?.ClaimedBy ?? '');
  const priority =
    priorityState.ecoId === ecoId
      ? priorityState.value
      : getKnownPriorityOrDefault(eco?.Priority ?? ecoPriorities.medium);
  const comment = commentState.ecoId === ecoId ? commentState.value : '';
  const files = fileState.ecoId === ecoId ? fileState.value : [];
  const section = sectionState.ecoId === ecoId ? sectionState.value : ecoDetailSections.overview;
  const editor = editorState.ecoId === ecoId ? editorState.value : null;

  const setAssignedTo = (value: string) => setAssignedState({ ecoId, value });
  const setPriority = (value: string) => setPriorityState({ ecoId, value });
  const setComment = (value: string) => setCommentState({ ecoId, value });
  const setFiles = (value: File[]) => setFileState({ ecoId, value });
  const setSection = (value: EcoDetailSection) => setSectionState({ ecoId, value });

  const openAssignmentEditor = () => {
    setAssignedState({ ecoId, value: eco?.ClaimedBy ?? '' });
    setEditorState({ ecoId, value: ecoDetailEditors.assignment });
  };

  const openPriorityEditor = () => {
    setPriorityState({ ecoId, value: getKnownPriorityOrDefault(eco?.Priority) });
    setEditorState({ ecoId, value: ecoDetailEditors.priority });
  };

  const closeEditor = () => {
    setEditorState({ ecoId, value: null });
  };

  const saveAssignment = () => {
    if (!eco) return;
    onAssign(eco, assignedTo.trim());
    closeEditor();
  };

  const savePriority = () => {
    if (!eco) return;
    onPriority(eco, priority);
    closeEditor();
  };

  const runWorkflowAction = async (action: WorkflowAction) => {
    if (!eco || isWorkflowActionPending) return;
    setIsWorkflowActionPending(true);

    try {
      const updatedEco = await onWorkflowAction(eco, action, comment);
      toast.showSuccess(getWorkflowSuccessMessage(updatedEco, action));
      setComment('');
    } catch (error) {
      toast.showError(getWorkflowErrorMessage(error, eco, action));
    } finally {
      setIsWorkflowActionPending(false);
    }
  };

  const attachFiles = () => {
    if (!eco || !files.length) return;
    onAddAttachments(eco, files);
    setFiles([]);
  };

  return {
    assignedTo,
    attachFiles,
    closeEditor,
    comment,
    editor,
    files,
    isWorkflowActionPending,
    priority,
    openAssignmentEditor,
    openPriorityEditor,
    runWorkflowAction,
    saveAssignment,
    savePriority,
    section,
    setAssignedTo,
    setComment,
    setFiles,
    setPriority,
    setSection,
    toast,
  };
};
