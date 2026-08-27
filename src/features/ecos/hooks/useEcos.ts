import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { appConfig } from '../../../app/config';
import { auditActions } from '../constants';
import { getEcoSyncStatus } from '../logic/ecoSyncStatus';
import { applyWorkflowAction } from '../logic/ecoWorkflow';
import { createAttachment, ecoService } from '../services/ecoService';
import type { CreateEcoInput, Eco, WorkflowAction } from '../types';

const ecosQueryKey = ['ecos'];
const currentUserQueryKey = ['currentUser'];
const fallbackCurrentUserName = 'Current User';
const noPriorityLabel = 'None';

function replaceEco(ecos: Eco[], next: Eco) {
  return ecos.some((eco) => eco.ChangeOrder === next.ChangeOrder)
    ? ecos.map((eco) => (eco.ChangeOrder === next.ChangeOrder ? next : eco))
    : [next, ...ecos];
}

export function useEcos() {
  const queryClient = useQueryClient();
  const ecosQuery = useQuery({
    queryKey: ecosQueryKey,
    queryFn: ecoService.listEcos,
    refetchInterval: appConfig.sync.pollIntervalMs || false,
    refetchOnWindowFocus: true,
  });
  const currentUserQuery = useQuery({
    queryKey: currentUserQueryKey,
    queryFn: ecoService.currentUser,
  });

  const getEcos = () => queryClient.getQueryData<Eco[]>(ecosQueryKey) ?? [];
  const setEcos = (updater: (ecos: Eco[]) => Eco[]) => {
    const next = updater(getEcos());
    ecoService.persistDrafts(next);
    queryClient.setQueryData(ecosQueryKey, next);
  };

  const saveDraft = useMutation({
    mutationFn: async ({ input, existing }: { input: CreateEcoInput; existing?: Eco }) =>
      ecoService.saveDraft(input, existing),
    onSuccess: (draft) => setEcos((ecos) => replaceEco(ecos, draft)),
  });

  const submitEco = useMutation({
    mutationFn: async ({ input, existing }: { input: CreateEcoInput; existing?: Eco }) =>
      ecoService.submitEco(input, existing),
    onSuccess: (submitted) => setEcos((ecos) => replaceEco(ecos, submitted)),
  });

  const updateEco = (next: Eco) => {
    setEcos((ecos) => replaceEco(ecos, next));
  };

  const deleteDraft = (ecoId: string) => {
    setEcos((ecos) => ecos.filter((eco) => eco.ChangeOrder !== ecoId));
  };

  const actionEco = (eco: Eco, action: WorkflowAction, comment?: string) => {
    const userName = currentUserQuery.data?.displayName ?? fallbackCurrentUserName;
    const updatedEco = applyWorkflowAction(eco, action, { userName, comment });
    updateEco(updatedEco);
    return updatedEco;
  };

  const assignEco = (eco: Eco, claimedBy: string) => {
    const userName = currentUserQuery.data?.displayName ?? fallbackCurrentUserName;
    updateEco({
      ...eco,
      ClaimedBy: claimedBy,
      SignoffHistory: [
        ...(eco.SignoffHistory ?? []),
        {
          User: userName,
          Action: claimedBy ? auditActions.assignedToUpdated : auditActions.assignedToCleared,
          Date: new Date().toISOString(),
          Comment: claimedBy ? `Assigned to ${claimedBy}` : 'Assignment removed',
        },
      ],
    });
  };

  const updatePriority = (eco: Eco, priority: string) => {
    const userName = currentUserQuery.data?.displayName ?? fallbackCurrentUserName;
    updateEco({
      ...eco,
      Priority: priority,
      SignoffHistory: [
        ...(eco.SignoffHistory ?? []),
        {
          User: userName,
          Action: auditActions.priorityUpdated,
          Date: new Date().toISOString(),
          Comment: `${eco.Priority ?? noPriorityLabel} to ${priority}`,
        },
      ],
    });
  };

  const addAttachments = (eco: Eco, files: File[]) => {
    const userName = currentUserQuery.data?.displayName ?? fallbackCurrentUserName;
    const attachments = files.map((file) => createAttachment(file, userName));
    updateEco({
      ...eco,
      Attachments: [...(eco.Attachments ?? []), ...attachments],
      SignoffHistory: [
        ...(eco.SignoffHistory ?? []),
        {
          User: userName,
          Action: auditActions.attachmentsAdded,
          Date: new Date().toISOString(),
          Comment: attachments.map((attachment) => attachment.name).join(', '),
        },
      ],
    });
  };

  return {
    ecos: ecosQuery.data ?? [],
    isLoading: ecosQuery.data === undefined,
    isError: ecosQuery.isError,
    syncStatus: getEcoSyncStatus(ecosQuery.isFetching, ecosQuery.isError),
    currentUser: currentUserQuery.data,
    saveDraft,
    submitEco,
    updateEco,
    deleteDraft,
    actionEco,
    assignEco,
    updatePriority,
    addAttachments,
  };
}
