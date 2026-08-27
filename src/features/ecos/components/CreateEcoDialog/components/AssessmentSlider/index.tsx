import { Box, Slider, Stack, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import type { AssessmentSliderProps } from './types';

const AssessmentSlider = ({ control, name, label, weight }: AssessmentSliderProps) => (
  <Box sx={{ gridColumn: { xs: '1 / -1', md: 'span 4' } }}>
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Box>
          <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={{ fontWeight: 800 }}>
              {label}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {field.value} | {weight}
            </Typography>
          </Stack>
          <Slider
            min={1}
            max={5}
            step={1}
            marks
            value={field.value}
            onChange={(_, value) => field.onChange(value)}
          />
        </Box>
      )}
    />
  </Box>
);

export default AssessmentSlider;
