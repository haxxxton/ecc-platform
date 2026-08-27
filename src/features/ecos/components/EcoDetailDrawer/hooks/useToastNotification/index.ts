import { useState } from 'react';
import type { ToastNotificationState } from './types';

export function useToastNotification() {
  const [notification, setNotification] = useState<ToastNotificationState>();

  return {
    clearNotification: () => setNotification(undefined),
    notification,
    showError: (message: string) => setNotification({ message, severity: 'error' }),
    showSuccess: (message: string) => setNotification({ message, severity: 'success' }),
  };
}
