import EditNoteIcon from '@mui/icons-material/EditNote';
import { Badge, Box, Button, IconButton, Skeleton, Tooltip } from '@mui/material';
import type { DraftEcosActionProps } from '../../types';

const DraftEcosAction = ({ draftCount, isLoading, onShowDrafts }: DraftEcosActionProps) => (
  <>
    <Button
      color="inherit"
      disabled={isLoading}
      variant="outlined"
      onClick={onShowDrafts}
      sx={{ display: { xs: 'none', md: 'inline-flex' } }}
    >
      {isLoading ? (
        <Skeleton animation="wave" width={76} sx={{ bgcolor: 'rgba(255, 255, 255, 0.25)' }} />
      ) : (
        <Badge badgeContent={draftCount} color="warning">
          Draft ECOs
        </Badge>
      )}
    </Button>
    <Box sx={{ display: { xs: 'inline-flex', md: 'none' } }}>
      {isLoading ? (
        <Skeleton
          animation="wave"
          height={40}
          variant="circular"
          width={40}
          sx={{ bgcolor: 'rgba(255, 255, 255, 0.25)' }}
        />
      ) : (
        <Tooltip title="Draft ECOs">
          <IconButton
            aria-label={`Draft ECOs, ${draftCount}`}
            color="inherit"
            onClick={onShowDrafts}
          >
            <Badge badgeContent={draftCount} color="warning">
              <EditNoteIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      )}
    </Box>
  </>
);

export default DraftEcosAction;
