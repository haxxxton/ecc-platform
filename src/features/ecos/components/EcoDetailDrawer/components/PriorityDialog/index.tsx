import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { priorityOptions } from '../../../../constants';
import type { PriorityDialogProps } from '../types';

const PriorityDialog = ({
  open,
  priority,
  onCancel,
  onPriorityChange,
  onSavePriority,
}: PriorityDialogProps) => (
  <Dialog fullWidth maxWidth="xs" open={open} onClose={onCancel}>
    <DialogTitle>Change priority</DialogTitle>
    <DialogContent>
      <FormControl fullWidth margin="dense">
        <InputLabel>Priority</InputLabel>
        <Select
          autoFocus
          label="Priority"
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value)}
        >
          {priorityOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Cancel</Button>
      <Button variant="contained" onClick={onSavePriority}>
        Save priority
      </Button>
    </DialogActions>
  </Dialog>
);

export default PriorityDialog;
