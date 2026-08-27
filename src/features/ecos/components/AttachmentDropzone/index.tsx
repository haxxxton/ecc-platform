import { Stack } from '@mui/material';
import AttachmentDropzoneContent from './components/AttachmentDropzoneContent';
import { useAttachmentDropzone } from './hooks/useAttachmentDropzone';
import type { AttachmentDropzoneProps } from './types';

const AttachmentDropzone = ({ files, onFilesChange, compact = false }: AttachmentDropzoneProps) => {
  const dropzone = useAttachmentDropzone({ files, onFilesChange });

  return (
    <Stack {...dropzone.getRootProps()}>
      <input {...dropzone.getInputProps()} />
      <AttachmentDropzoneContent
        compact={compact}
        fileRejections={dropzone.fileRejections}
        files={files}
        isDragActive={dropzone.isDragActive}
        onBrowse={dropzone.openFileDialog}
        onClear={() => onFilesChange([])}
      />
    </Stack>
  );
};

export default AttachmentDropzone;
