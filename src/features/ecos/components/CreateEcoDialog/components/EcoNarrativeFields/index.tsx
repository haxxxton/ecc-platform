import { Box, TextField } from '@mui/material';
import AttachmentDropzoneContent from '../../../AttachmentDropzone/components/AttachmentDropzoneContent';
import { resizableTextAreaSx } from './constants';
import type { EcoNarrativeFieldsProps } from '../types';

const EcoNarrativeFields = ({
  errors,
  fileRejections,
  files,
  isDragActive,
  onBrowseFiles,
  register,
  setFiles,
}: EcoNarrativeFieldsProps) => (
  <>
    <Box sx={{ gridColumn: '1 / -1' }}>
      <TextField
        label="Reason"
        fullWidth
        multiline
        minRows={3}
        sx={resizableTextAreaSx}
        error={Boolean(errors.Reason)}
        helperText={errors.Reason?.message}
        {...register('Reason')}
      />
    </Box>
    <Box sx={{ gridColumn: '1 / -1' }}>
      <TextField
        label="Full Description"
        fullWidth
        multiline
        minRows={3}
        sx={resizableTextAreaSx}
        error={Boolean(errors.FullDescription)}
        helperText={errors.FullDescription?.message}
        {...register('FullDescription')}
      />
    </Box>
    <Box sx={{ gridColumn: '1 / -1' }}>
      <TextField
        label="Notes"
        fullWidth
        multiline
        minRows={3}
        sx={resizableTextAreaSx}
        {...register('Notes')}
      />
    </Box>
    <Box sx={{ gridColumn: '1 / -1' }}>
      <AttachmentDropzoneContent
        compact
        fileRejections={fileRejections}
        files={files}
        isDragActive={isDragActive}
        onBrowse={onBrowseFiles}
        onClear={() => setFiles([])}
      />
    </Box>
  </>
);

export default EcoNarrativeFields;
