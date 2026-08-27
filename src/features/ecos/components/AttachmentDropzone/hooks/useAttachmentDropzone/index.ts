import { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { appConfig } from '../../../../../../app/config';
import { buildFileAccept } from '../../logic';
import type { UseAttachmentDropzoneOptions } from './types';

export function useAttachmentDropzone({ files, onFilesChange }: UseAttachmentDropzoneOptions) {
  const accept = useMemo(() => buildFileAccept(appConfig.allowedUploadMimeTypes as string[]), []);
  const dropzone = useDropzone({
    accept,
    multiple: true,
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => onFilesChange([...files, ...acceptedFiles]),
  });

  return {
    ...dropzone,
    openFileDialog: dropzone.open,
  };
}
