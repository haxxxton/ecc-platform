import AddIcon from '@mui/icons-material/Add';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import type { CreateEcoActionProps } from '../../types';

const CreateEcoAction = ({ isLoading, onCreate }: CreateEcoActionProps) => (
  <>
    <Button
      color="inherit"
      disabled={isLoading}
      startIcon={<AddIcon />}
      variant="outlined"
      onClick={onCreate}
      sx={{ display: { xs: 'none', md: 'inline-flex' } }}
    >
      Create ECO
    </Button>
    <Tooltip title="Create ECO">
      <Box component="span" sx={{ display: { xs: 'inline-flex', md: 'none' } }}>
        <IconButton aria-label="Create ECO" color="inherit" disabled={isLoading} onClick={onCreate}>
          <AddIcon />
        </IconButton>
      </Box>
    </Tooltip>
  </>
);

export default CreateEcoAction;
