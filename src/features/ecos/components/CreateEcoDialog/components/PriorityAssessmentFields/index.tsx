import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { priorityOptions } from '../../../../constants';
import { priorityFromScore } from '../../../../logic/ecoPriority';
import AssessmentSlider from '../AssessmentSlider';
import type { PriorityAssessmentFieldsProps } from '../types';

const PriorityAssessmentFields = ({ control, score, setValue }: PriorityAssessmentFieldsProps) => (
  <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      sx={{ gap: 2, justifyContent: 'space-between', mb: 2 }}
    >
      <Box>
        <Typography variant="h3">Priority Assessment</Typography>
        <Typography variant="body2" color="text.secondary">
          Optional guidance only. Users can manually select priority.
        </Typography>
      </Box>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <TextField
          label="Score"
          value={score.toFixed(2)}
          size="small"
          slotProps={{ input: { readOnly: true } }}
        />
        <Controller
          control={control}
          name="Priority"
          render={({ field }) => (
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Priority</InputLabel>
              <Select label="Priority" {...field}>
                {priorityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Button
          color="inherit"
          size="small"
          variant="outlined"
          onClick={() => setValue('Priority', priorityFromScore(score), { shouldDirty: true })}
        >
          Use score
        </Button>
      </Stack>
    </Stack>
    <Box
      sx={{
        display: 'grid',
        columnGap: 3,
        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
        rowGap: 2.5,
      }}
    >
      <AssessmentSlider
        control={control}
        name="ProductImpact"
        label="Product impact"
        weight="30%"
      />
      <AssessmentSlider
        control={control}
        name="CustomerImpact"
        label="Customer impact"
        weight="20%"
      />
      <AssessmentSlider control={control} name="CostImpact" label="Cost impact" weight="15%" />
      <AssessmentSlider
        control={control}
        name="RegulatoryCompliance"
        label="Compliance"
        weight="15%"
      />
      <AssessmentSlider
        control={control}
        name="ImplementationEffort"
        label="Implementation effort"
        weight="10%"
      />
      <AssessmentSlider
        control={control}
        name="ScheduleImpact"
        label="Schedule impact"
        weight="10%"
      />
    </Box>
  </Box>
);

export default PriorityAssessmentFields;
