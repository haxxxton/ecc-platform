import type { ToastNotificationState } from '../../hooks/useToastNotification/types';

export type WorkflowToastProps = {
  notification?: ToastNotificationState;
  onClose: () => void;
};
