import type { FileRejection } from 'react-dropzone';

export type AttachmentDropzoneContentProps = {
  compact?: boolean;
  fileRejections: readonly FileRejection[];
  files: File[];
  isDragActive: boolean;
  onBrowse: () => void;
  onClear: () => void;
};
