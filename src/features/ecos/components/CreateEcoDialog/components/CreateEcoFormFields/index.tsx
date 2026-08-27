import { Box, DialogContent } from '@mui/material';
import CoreEcoFields from '../CoreEcoFields';
import EcoNarrativeFields from '../EcoNarrativeFields';
import PriorityAssessmentFields from '../PriorityAssessmentFields';
import type { CreateEcoFormFieldsProps } from '../types';

const CreateEcoFormFields = ({
  control,
  errors,
  fileRejections,
  files,
  isDragActive,
  onBrowseFiles,
  ownerOptions,
  register,
  score,
  setFiles,
  setValue,
}: CreateEcoFormFieldsProps) => (
  <DialogContent dividers>
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
      }}
    >
      <CoreEcoFields
        control={control}
        errors={errors}
        ownerOptions={ownerOptions}
        register={register}
      />
      <Box sx={{ gridColumn: '1 / -1' }}>
        <PriorityAssessmentFields control={control} score={score} setValue={setValue} />
      </Box>
      <EcoNarrativeFields
        errors={errors}
        fileRejections={fileRejections}
        files={files}
        isDragActive={isDragActive}
        onBrowseFiles={onBrowseFiles}
        register={register}
        setFiles={setFiles}
      />
    </Box>
  </DialogContent>
);

export default CreateEcoFormFields;
