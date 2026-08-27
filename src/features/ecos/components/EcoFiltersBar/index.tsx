import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, InputAdornment, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { allOption } from '../../constants';
import { assignedOptions, uniqueOptions } from '../../logic/ecoFilters';
import ActiveFilterChips from './components/ActiveFilterChips';
import FilterCombobox from './components/FilterCombobox';
import type { EcoFiltersBarProps } from './types';

const EcoFiltersBar = ({
  ecos,
  filters,
  isLoading,
  visibleCount,
  totalCount,
  ownerOptions,
  scope,
  onFilter,
  onScope,
  onClear,
}: EcoFiltersBarProps) => (
  <Box>
    <Box
      sx={{
        alignItems: 'center',
        display: 'grid',
        gap: 1.5,
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(12, 1fr)' },
      }}
    >
      <Box sx={{ gridColumn: { xs: '1 / -1', md: 'span 4' } }}>
        <TextField
          disabled={isLoading}
          fullWidth
          label="Search ECOs"
          value={filters.search}
          onChange={(event) => onFilter('search', event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <FilterCombobox
        disabled={isLoading}
        label="Category"
        value={filters.category}
        options={uniqueOptions(ecos, 'Category')}
        onChange={(value) => onFilter('category', value)}
      />
      <FilterCombobox
        disabled={isLoading}
        label="Owner"
        value={filters.owner}
        options={[allOption, ...ownerOptions]}
        onChange={(value) => onFilter('owner', value)}
      />
      <FilterCombobox
        disabled={isLoading}
        label="Assigned"
        value={filters.assignedTo}
        options={assignedOptions(ecos)}
        onChange={(value) => onFilter('assignedTo', value)}
      />
      <FilterCombobox
        disabled={isLoading}
        label="Priority"
        value={filters.priority}
        options={uniqueOptions(ecos, 'Priority')}
        onChange={(value) => onFilter('priority', value)}
      />
      <FilterCombobox
        disabled={isLoading}
        label="Stage"
        value={filters.stage}
        options={uniqueOptions(ecos, 'StatusCode')}
        onChange={(value) => onFilter('stage', value)}
      />
      <FilterCombobox
        disabled={isLoading}
        label="Action"
        value={filters.actionRequired}
        options={uniqueOptions(ecos, 'ActionReqd')}
        onChange={(value) => onFilter('actionRequired', value)}
      />
    </Box>
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={1}
      sx={{ alignItems: { md: 'center' }, mt: 1.5 }}
    >
      {isLoading ? (
        <Skeleton aria-label="Loading ECO result count" width={160} />
      ) : (
        <Typography variant="body2" color="primary" sx={{ fontWeight: 800 }}>
          Showing {visibleCount} of {totalCount} ECOs
        </Typography>
      )}
      <ActiveFilterChips filters={filters} scope={scope} onFilter={onFilter} onScope={onScope} />
      <Button disabled={isLoading} startIcon={<ClearIcon />} onClick={onClear}>
        Clear filters
      </Button>
    </Stack>
  </Box>
);

export default EcoFiltersBar;
