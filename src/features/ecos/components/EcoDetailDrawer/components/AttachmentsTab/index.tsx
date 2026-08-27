import { Box, Button, Divider, Link, Stack, Typography } from '@mui/material';
import AttachmentDropzone from '../../../AttachmentDropzone';
import type { AttachmentsTabProps } from '../types';

const AttachmentsTab = ({ eco, files, onAttachFiles, onFilesChange }: AttachmentsTabProps) => (
  <Stack spacing={2}>
    <AttachmentDropzone files={files} onFilesChange={onFilesChange} />
    <Button variant="contained" disabled={!files.length} onClick={onAttachFiles}>
      Add to ECO
    </Button>
    <Divider />
    <Typography variant="h3">Current Attachments</Typography>
    {(eco.Attachments ?? []).length ? (
      <Stack spacing={1}>
        {(eco.Attachments ?? []).map((attachment) => (
          <Box key={attachment.id}>
            <Link href={attachment.url} target="_blank" rel="noreferrer">
              {attachment.name}
            </Link>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              {Math.round(attachment.size / 1024)} KB | {attachment.uploadedBy}
            </Typography>
          </Box>
        ))}
      </Stack>
    ) : (
      <Typography variant="body2" color="text.secondary">
        No attachments recorded.
      </Typography>
    )}
  </Stack>
);

export default AttachmentsTab;
