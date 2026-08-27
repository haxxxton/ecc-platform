import { actionRequiredLabels, auditActions, ecoStatuses, workflowStageCodes } from '../constants';
import { sampleEcos } from '../data/sampleEcos';
import { getAgeDays } from '../logic/ecoDates';
import { createMockChangeOrder } from '../logic/ecoIdentifiers';
import { isDraftStatus } from '../logic/ecoStatus';
import type { CreateEcoInput, CurrentUser, Eco, EcoAttachment } from '../types';

const draftsKey = 'eccPortalDrafts';
const currentUserDisplayName = 'Current User';

function delay<T>(value: T) {
  return new Promise<T>((resolve) => window.setTimeout(() => resolve(value), 180));
}

function loadDrafts() {
  try {
    return JSON.parse(localStorage.getItem(draftsKey) ?? '[]') as Eco[];
  } catch {
    return [];
  }
}

function persistDrafts(ecos: Eco[]) {
  const drafts = ecos.filter((eco) => isDraftStatus(eco.EccStatus));
  localStorage.setItem(draftsKey, JSON.stringify(drafts));
}

function normalizeEco(eco: Eco): Eco {
  return {
    ...eco,
    AgeDays: getAgeDays(eco),
    Attachments: eco.Attachments ?? [],
    ClaimedBy: eco.ClaimedBy ?? '',
    SignoffHistory: eco.SignoffHistory ?? [],
  };
}

export const ecoService = {
  async listEcos() {
    const drafts = loadDrafts();
    const merged = [
      ...drafts,
      ...sampleEcos.filter((eco) => !drafts.some((d) => d.ChangeOrder === eco.ChangeOrder)),
    ];
    return delay(merged.map(normalizeEco));
  },

  async currentUser(): Promise<CurrentUser> {
    return delay({
      id: 'current-user',
      displayName: currentUserDisplayName,
      roles: ['ECC_COORDINATOR', 'ECC_APPROVER', 'ECC_SUPERUSER'],
    });
  },

  async saveDraft(input: CreateEcoInput, existing?: Eco) {
    return delay({
      ...existing,
      ...input,
      ChangeOrder: existing?.ChangeOrder ?? createMockChangeOrder(),
      EccStatus: ecoStatuses.draft,
      StatusCode: workflowStageCodes.draft,
      ActionReqd: actionRequiredLabels.continueDraft,
      DateRaised: existing?.DateRaised ?? new Date().toISOString(),
      ClaimedBy: '',
      Attachments: existing?.Attachments ?? [],
      SignoffHistory: [
        ...(existing?.SignoffHistory ?? []),
        {
          User: currentUserDisplayName,
          Action: auditActions.draftSaved,
          Date: new Date().toISOString(),
          Comment: '',
        },
      ],
    } satisfies Eco);
  },

  async submitEco(input: CreateEcoInput, existing?: Eco) {
    return delay({
      ...existing,
      ...input,
      ChangeOrder: existing?.ChangeOrder ?? createMockChangeOrder(),
      EccStatus: ecoStatuses.new,
      StatusCode: workflowStageCodes.request,
      ActionReqd: actionRequiredLabels.signOnRequired,
      DateRaised: existing?.DateRaised ?? new Date().toISOString(),
      ClaimedBy: '',
      Attachments: existing?.Attachments ?? [],
      SignoffHistory: [
        ...(existing?.SignoffHistory ?? []),
        {
          User: currentUserDisplayName,
          Action: auditActions.ecoSubmitted,
          Date: new Date().toISOString(),
          Comment: '',
        },
      ],
    } satisfies Eco);
  },

  persistDrafts,
};

export function createAttachment(file: File, uploadedBy: string): EcoAttachment {
  return {
    id: `${Date.now()}-${file.name}`,
    name: file.name,
    mimeType: file.type || 'application/octet-stream',
    size: file.size,
    url: URL.createObjectURL(file),
    uploadedAt: new Date().toISOString(),
    uploadedBy,
  };
}
