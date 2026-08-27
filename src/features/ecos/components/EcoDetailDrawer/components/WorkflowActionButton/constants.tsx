import DoneIcon from '@mui/icons-material/Done';
import RuleIcon from '@mui/icons-material/Rule';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import type { ReactNode } from 'react';
import { workflowActions } from '../../../../constants';
import type { WorkflowAction } from '../../../../types';

export const workflowActionButtonPresentation: Record<
  WorkflowAction,
  {
    color: 'error' | 'primary' | 'success';
    icon: ReactNode;
    label: string;
    variant: 'contained' | 'outlined';
  }
> = {
  [workflowActions.approved]: {
    color: 'success',
    icon: <DoneIcon />,
    label: 'Approve',
    variant: 'contained',
  },
  [workflowActions.rejected]: {
    color: 'error',
    icon: <ThumbDownOutlinedIcon />,
    label: 'Reject',
    variant: 'outlined',
  },
  [workflowActions.changesRequested]: {
    color: 'primary',
    icon: <RuleIcon />,
    label: 'Request changes',
    variant: 'outlined',
  },
};
