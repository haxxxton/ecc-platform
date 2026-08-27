import { Autocomplete, Box, TextField } from '@mui/material';
import type { FilterComboboxProps } from './types';

const FilterCombobox = ({ disabled, label, value, options, onChange }: FilterComboboxProps) => (
  <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}>
    <Autocomplete
      autoHighlight
      disableClearable
      disabled={disabled}
      fullWidth
      options={options}
      value={value}
      onChange={(_, nextValue) => onChange(nextValue)}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  </Box>
);

export default FilterCombobox;
