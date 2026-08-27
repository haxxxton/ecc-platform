import CloseIcon from '@mui/icons-material/Close';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {
  AppBar,
  Box,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import EcoFiltersBar from '../../../EcoFiltersBar';
import type { EcoFiltersDialogProps } from '../../types';

const EcoFiltersDialog = ({
  appliedFilterCount,
  onClose,
  open,
  ...filterBarProps
}: EcoFiltersDialogProps) => (
  <Dialog fullScreen open={open} onClose={onClose} aria-labelledby="eco-filters-dialog-title">
    <AppBar color="default" elevation={1} position="static">
      <Toolbar>
        <FilterAltOutlinedIcon sx={{ mr: 1.25 }} />
        <Typography id="eco-filters-dialog-title" variant="h2">
          Filters
        </Typography>
        {appliedFilterCount > 0 && (
          <Chip
            color="primary"
            label={`${appliedFilterCount} applied`}
            size="small"
            sx={{ ml: 1.25 }}
          />
        )}
        <Box sx={{ flex: 1 }} />
        <Tooltip title="Close filters">
          <IconButton aria-label="Close filters" edge="end" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
    <DialogContent dividers sx={{ p: { xs: 2, sm: 3 } }}>
      <EcoFiltersBar {...filterBarProps} />
    </DialogContent>
  </Dialog>
);

export default EcoFiltersDialog;
