import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Chip, Stack } from '@mui/material';
import { allOption, ecoScopeLabels } from '../../../../constants';
import { activeFilterDefinitions } from '../../constants';
import type { ActiveFilterChipsProps } from '../types';

const ActiveFilterChips = ({ filters, scope, onFilter, onScope }: ActiveFilterChipsProps) => (
  <Stack direction="row" spacing={0.75} sx={{ flex: 1, flexWrap: 'wrap' }}>
    {scope !== 'active' && (
      <Chip
        color="primary"
        icon={<CheckCircleIcon />}
        label={`Applied view: ${ecoScopeLabels[scope]}`}
        onDelete={() => onScope('active')}
        size="small"
      />
    )}
    {filters.search && (
      <Chip
        label={`Search: ${filters.search}`}
        onDelete={() => onFilter('search', '')}
        size="small"
      />
    )}
    {activeFilterDefinitions.map(([label, key]) =>
      filters[key] !== allOption ? (
        <Chip
          key={key}
          label={`${label}: ${filters[key]}`}
          onDelete={() => onFilter(key, allOption)}
          size="small"
        />
      ) : null,
    )}
  </Stack>
);

export default ActiveFilterChips;
