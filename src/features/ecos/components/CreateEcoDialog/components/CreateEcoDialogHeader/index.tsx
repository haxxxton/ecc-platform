import CloseIcon from '@mui/icons-material/Close';
import { Box, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import type { CreateEcoDialogHeaderProps } from '../types';

const CreateEcoDialogHeader = ({ title, onClose }: CreateEcoDialogHeaderProps) => (
  <DialogTitle>
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="h2">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Required fields must be completed before submitting. Drafts can be saved earlier.
        </Typography>
      </Box>
      <IconButton onClick={onClose} aria-label="Close create ECO dialog">
        <CloseIcon />
      </IconButton>
    </Stack>
  </DialogTitle>
);

export default CreateEcoDialogHeader;
