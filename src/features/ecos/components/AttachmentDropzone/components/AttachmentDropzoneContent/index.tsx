import AttachFileIcon from '@mui/icons-material/AttachFile';
import ClearIcon from '@mui/icons-material/Clear';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Alert, Button, ButtonBase, Chip, Stack, Typography } from '@mui/material';
import type { AttachmentDropzoneContentProps } from './types';

const AttachmentDropzoneContent = ({
  compact = false,
  fileRejections,
  files,
  isDragActive,
  onBrowse,
  onClear,
}: AttachmentDropzoneContentProps) => (
  <Stack spacing={1}>
    <ButtonBase
      onClick={onBrowse}
      sx={{
        bgcolor: isDragActive ? 'action.hover' : 'background.default',
        border: 1,
        borderColor: isDragActive ? 'primary.main' : 'divider',
        borderRadius: 1,
        borderStyle: 'dashed',
        cursor: 'pointer',
        display: 'block',
        p: compact ? 1.5 : 2,
        textAlign: 'center',
        width: '100%',
      }}
    >
      <UploadFileIcon color="primary" />
      <Typography variant="body2" sx={{ fontWeight: 800 }}>
        Drop files anywhere in this window or click to browse
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Allowed types are configured for the backend upload policy.
      </Typography>
    </ButtonBase>
    {fileRejections.length > 0 && (
      <Alert severity="warning">
        Some files were rejected because their MIME type is not allowed.
      </Alert>
    )}
    {files.length > 0 && (
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75 }}>
        {files.map((file) => (
          <Chip
            key={`${file.name}-${file.size}`}
            icon={<AttachFileIcon />}
            label={file.name}
            size="small"
          />
        ))}
        <Button color="inherit" size="small" startIcon={<ClearIcon />} onClick={onClear}>
          Clear selection
        </Button>
      </Stack>
    )}
  </Stack>
);

export default AttachmentDropzoneContent;
