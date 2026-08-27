import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box, Stack, Typography } from '@mui/material';

const CreateEcoDropOverlay = () => (
  <Box
    sx={{
      alignItems: 'center',
      backdropFilter: 'blur(2px)',
      bgcolor: 'rgba(15, 76, 129, 0.18)',
      border: 3,
      borderColor: 'primary.main',
      display: 'flex',
      inset: 0,
      justifyContent: 'center',
      pointerEvents: 'none',
      position: 'absolute',
      zIndex: 10,
    }}
  >
    <Stack sx={{ alignItems: 'center' }}>
      <UploadFileIcon color="primary" sx={{ fontSize: 48 }} />
      <Typography variant="h2">Drop files to attach</Typography>
    </Stack>
  </Box>
);

export default CreateEcoDropOverlay;
