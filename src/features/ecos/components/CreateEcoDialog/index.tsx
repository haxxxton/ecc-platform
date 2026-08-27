import { Box, Dialog } from '@mui/material';
import CreateEcoDropOverlay from './components/CreateEcoDropOverlay';
import CreateEcoDialogActions from './components/CreateEcoDialogActions';
import CreateEcoDialogHeader from './components/CreateEcoDialogHeader';
import CreateEcoFormFields from './components/CreateEcoFormFields';
import { useCreateEcoDialog } from './hooks/useCreateEcoDialog';
import type { CreateEcoDialogProps } from './types';

const CreateEcoDialog = (props: CreateEcoDialogProps) => {
  const { open, editingDraft, ownerOptions, onDeleteDraft } = props;
  const dialog = useCreateEcoDialog(props);

  return (
    <Dialog open={open} onClose={dialog.closeWithCheck} fullWidth maxWidth="lg">
      <Box
        {...dialog.attachmentDropzone.getRootProps()}
        aria-label="Create ECO file drop area"
        sx={{ display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative' }}
      >
        <input {...dialog.attachmentDropzone.getInputProps()} />
        <CreateEcoDialogHeader title={dialog.title} onClose={dialog.closeWithCheck} />
        <CreateEcoFormFields
          control={dialog.control}
          errors={dialog.formState.errors}
          fileRejections={dialog.attachmentDropzone.fileRejections}
          files={dialog.files}
          isDragActive={dialog.attachmentDropzone.isDragActive}
          onBrowseFiles={dialog.attachmentDropzone.openFileDialog}
          ownerOptions={ownerOptions}
          register={dialog.register}
          score={dialog.score}
          setFiles={dialog.setFiles}
          setValue={dialog.setValue}
        />
        <CreateEcoDialogActions
          editingDraft={editingDraft}
          isSubmitting={dialog.formState.isSubmitting}
          onClose={dialog.closeWithCheck}
          onSaveDraft={dialog.saveDraft}
          onSubmitEco={dialog.submitEco}
          onDeleteDraft={onDeleteDraft}
        />
        {dialog.attachmentDropzone.isDragActive && <CreateEcoDropOverlay />}
      </Box>
    </Dialog>
  );
};

export default CreateEcoDialog;
