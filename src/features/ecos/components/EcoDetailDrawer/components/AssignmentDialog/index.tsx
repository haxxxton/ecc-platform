import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import type { AssignmentDialogProps } from '../types';

const AssignmentDialog = ({
  assignedTo,
  open,
  userOptions,
  onAssignedToChange,
  onCancel,
  onSaveAssignment,
}: AssignmentDialogProps) => (
  <Dialog fullWidth maxWidth="xs" open={open} onClose={onCancel}>
    <DialogTitle>Change assigned user</DialogTitle>
    <DialogContent>
      <Autocomplete
        freeSolo
        autoHighlight
        options={userOptions}
        inputValue={assignedTo}
        value={assignedTo || null}
        onChange={(_, value) => onAssignedToChange(value ?? '')}
        onInputChange={(_, value, reason) => {
          if (reason !== 'reset') onAssignedToChange(value);
        }}
        renderInput={(params) => (
          <TextField {...params} autoFocus label="Assigned user" margin="dense" />
        )}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Cancel</Button>
      <Button variant="contained" onClick={onSaveAssignment}>
        Save assignment
      </Button>
    </DialogActions>
  </Dialog>
);

export default AssignmentDialog;
