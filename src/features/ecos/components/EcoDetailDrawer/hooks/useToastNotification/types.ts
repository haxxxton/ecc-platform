export type ToastSeverity = 'error' | 'success';

export type ToastNotificationState = {
  message: string;
  severity: ToastSeverity;
};
