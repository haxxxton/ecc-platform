import { Box, Button, DialogActions, Stack } from '@mui/material';
import type { CreateEcoDialogActionsProps } from '../types';

const CreateEcoDialogActions = ({
  editingDraft,
  isSubmitting,
  onClose,
  onSaveDraft,
  onSubmitEco,
  onDeleteDraft,
}: CreateEcoDialogActionsProps) => (
  <DialogActions sx={{ px: 3, py: 2, justifyContent: 'space-between' }}>
    <Box>
      {editingDraft && (
        <Button color="error" onClick={() => onDeleteDraft(editingDraft.ChangeOrder)}>
          Delete draft
        </Button>
      )}
    </Box>
    <Stack direction="row" spacing={1}>
      <Button color="inherit" onClick={onClose}>
        Discard
      </Button>
      <Button disabled={isSubmitting} onClick={onSaveDraft} variant="outlined" color="warning">
        Save draft
      </Button>
      <Button disabled={isSubmitting} onClick={onSubmitEco} variant="contained">
        Submit ECO
      </Button>
    </Stack>
  </DialogActions>
);

export default CreateEcoDialogActions;
