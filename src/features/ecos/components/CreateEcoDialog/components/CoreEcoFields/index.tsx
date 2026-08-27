import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { categoryOptions, manufacturingSources } from '../../../../constants';
import OwnerCombobox from '../OwnerCombobox';
import type { CoreEcoFieldsProps } from '../types';

const CoreEcoFields = ({ control, errors, ownerOptions, register }: CoreEcoFieldsProps) => (
  <>
    <Box sx={{ gridColumn: '1 / -1' }}>
      <TextField
        label="Description"
        fullWidth
        error={Boolean(errors.Description)}
        helperText={errors.Description?.message}
        {...register('Description')}
      />
    </Box>
    <Box sx={{ gridColumn: { xs: '1 / -1', md: 'span 3' } }}>
      <Controller
        control={control}
        name="Category"
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select label="Category" {...field}>
              {categoryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </Box>
    <Box sx={{ gridColumn: { xs: '1 / -1', md: 'span 3' } }}>
      <Controller
        control={control}
        name="CategoryState"
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel>Manufacturing Source</InputLabel>
            <Select label="Manufacturing Source" {...field}>
              {manufacturingSources.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </Box>
    <Box sx={{ gridColumn: { xs: '1 / -1', md: 'span 3' } }}>
      <TextField
        label="Originator"
        fullWidth
        error={Boolean(errors.Originator)}
        helperText={errors.Originator?.message}
        {...register('Originator')}
      />
    </Box>
    <OwnerCombobox control={control} error={errors.EccUser?.message} options={ownerOptions} />
  </>
);

export default CoreEcoFields;
