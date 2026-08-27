import { Autocomplete, Box, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import type { OwnerComboboxProps } from './types';

const OwnerCombobox = ({ control, error, options }: OwnerComboboxProps) => (
  <Box sx={{ gridColumn: { xs: '1 / -1', md: 'span 3' } }}>
    <Controller
      control={control}
      name="EccUser"
      render={({ field }) => (
        <Autocomplete
          freeSolo
          options={options}
          inputValue={field.value}
          value={field.value || null}
          onChange={(_, value) => field.onChange(value ?? '')}
          onInputChange={(_, value, reason) => {
            if (reason !== 'reset') field.onChange(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Owner"
              error={Boolean(error)}
              helperText={error}
              onBlur={field.onBlur}
              inputRef={field.ref}
            />
          )}
        />
      )}
    />
  </Box>
);

export default OwnerCombobox;
