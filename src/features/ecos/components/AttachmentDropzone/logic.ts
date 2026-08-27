import type { Accept } from 'react-dropzone';

export function buildFileAccept(mimeTypes: string[]): Accept {
  return mimeTypes.reduce<Accept>((accept, mimeType) => {
    accept[mimeType] = [];
    return accept;
  }, {});
}
