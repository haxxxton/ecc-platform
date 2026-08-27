export const appConfig = {
  apiBaseUrl: import.meta.env.VITE_ECC_API_BASE_URL ?? '/api',
  endpoints: {
    ecos: import.meta.env.VITE_ECC_ENDPOINT_ECOS ?? '/ecos',
    currentUser: import.meta.env.VITE_ECC_ENDPOINT_ME ?? '/me',
    config: import.meta.env.VITE_ECC_ENDPOINT_CONFIG ?? '/config',
  },
  permissions: {
    approve: import.meta.env.VITE_ECC_ROLE_APPROVE ?? 'ECC_APPROVER',
    reject: import.meta.env.VITE_ECC_ROLE_REJECT ?? 'ECC_APPROVER',
    requestChanges: import.meta.env.VITE_ECC_ROLE_REQUEST_CHANGES ?? 'ECC_APPROVER',
    assign: import.meta.env.VITE_ECC_ROLE_ASSIGN ?? 'ECC_COORDINATOR',
    editPriority: import.meta.env.VITE_ECC_ROLE_EDIT_PRIORITY ?? 'ECC_COORDINATOR',
    superUser: import.meta.env.VITE_ECC_ROLE_SUPERUSER ?? 'ECC_SUPERUSER',
  },
  allowedUploadMimeTypes: (
    import.meta.env.VITE_ECC_ALLOWED_UPLOAD_MIME_TYPES ??
    'application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/png,image/jpeg'
  ).split(','),
  sync: {
    pollIntervalMs: Math.max(0, Number(import.meta.env.VITE_ECC_POLL_INTERVAL_MS ?? 0) || 0),
  },
};
