import { describe, expect, it } from 'vitest';
import { buildFileAccept } from './logic';

describe('buildFileAccept', () => {
  it('creates a react-dropzone accept map from configured MIME types', () => {
    expect(buildFileAccept(['application/pdf', 'image/png'])).toEqual({
      'application/pdf': [],
      'image/png': [],
    });
  });
});
