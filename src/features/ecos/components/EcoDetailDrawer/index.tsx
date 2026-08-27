import { Box, Divider, Drawer, Tab, Tabs } from '@mui/material';
import AssignmentDialog from './components/AssignmentDialog';
import AttachmentsTab from './components/AttachmentsTab';
import AuditTab from './components/AuditTab';
import EcoDetailHeader from './components/EcoDetailHeader';
import OverviewTab from './components/OverviewTab';
import PriorityDialog from './components/PriorityDialog';
import WorkflowToast from './components/WorkflowToast';
import { ecoDetailEditors, ecoDetailSections } from './constants';
import { useEcoDetailDrawer } from './hooks/useEcoDetailDrawer';
import type { EcoDetailDrawerProps } from './types';

const EcoDetailDrawer = (props: EcoDetailDrawerProps) => {
  const { eco, open, userOptions, onClose } = props;
  const drawer = useEcoDetailDrawer(props);

  if (!eco) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: { xs: '100%', md: 720 } } } }}
    >
      <EcoDetailHeader eco={eco} onClose={onClose} />
      <Divider />
      <Tabs
        allowScrollButtonsMobile
        scrollButtons="auto"
        value={drawer.section}
        variant="scrollable"
        onChange={(_, value) => drawer.setSection(value)}
        sx={{ px: 2 }}
      >
        <Tab label="Overview" value={ecoDetailSections.overview} />
        <Tab label="Attachments" value={ecoDetailSections.attachments} />
        <Tab label="Audit history" value={ecoDetailSections.audit} />
      </Tabs>
      <Divider />
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto', p: 2.5 }}>
        {drawer.section === ecoDetailSections.overview && (
          <OverviewTab
            eco={eco}
            comment={drawer.comment}
            isWorkflowActionPending={drawer.isWorkflowActionPending}
            onCommentChange={drawer.setComment}
            onEditAssignment={drawer.openAssignmentEditor}
            onEditPriority={drawer.openPriorityEditor}
            onRunWorkflowAction={drawer.runWorkflowAction}
          />
        )}
        {drawer.section === ecoDetailSections.attachments && (
          <AttachmentsTab
            eco={eco}
            files={drawer.files}
            onAttachFiles={drawer.attachFiles}
            onFilesChange={drawer.setFiles}
          />
        )}
        {drawer.section === ecoDetailSections.audit && <AuditTab eco={eco} />}
      </Box>
      <AssignmentDialog
        assignedTo={drawer.assignedTo}
        open={drawer.editor === ecoDetailEditors.assignment}
        userOptions={userOptions}
        onAssignedToChange={drawer.setAssignedTo}
        onCancel={drawer.closeEditor}
        onSaveAssignment={drawer.saveAssignment}
      />
      <PriorityDialog
        open={drawer.editor === ecoDetailEditors.priority}
        priority={drawer.priority}
        onCancel={drawer.closeEditor}
        onPriorityChange={drawer.setPriority}
        onSavePriority={drawer.savePriority}
      />
      <WorkflowToast
        notification={drawer.toast.notification}
        onClose={drawer.toast.clearNotification}
      />
    </Drawer>
  );
};

export default EcoDetailDrawer;
