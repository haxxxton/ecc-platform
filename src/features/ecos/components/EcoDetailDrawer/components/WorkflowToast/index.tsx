import { Alert, Snackbar } from '@mui/material';
import type { WorkflowToastProps } from './types';

const WorkflowToast = ({ notification, onClose }: WorkflowToastProps) => (
  <Snackbar
    anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
    autoHideDuration={6000}
    open={Boolean(notification)}
    onClose={(_, reason) => {
      if (reason !== 'clickaway') onClose();
    }}
  >
    {notification ? (
      <Alert onClose={onClose} severity={notification.severity} variant="filled">
        {notification.message}
      </Alert>
    ) : undefined}
  </Snackbar>
);

export default WorkflowToast;
