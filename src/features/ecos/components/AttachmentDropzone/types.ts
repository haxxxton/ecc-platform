export type AttachmentDropzoneProps = {
  files: File[];
  onFilesChange: (files: File[]) => void;
  compact?: boolean;
};
