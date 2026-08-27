import type { CreateEcoInput, Eco, PriorityAssessment } from '../../../../types';
import type { EcoFormValues } from '../../types';

export const getPriorityAssessmentFromValues = (values: EcoFormValues): PriorityAssessment => ({
  ProductImpact: values.ProductImpact,
  CustomerImpact: values.CustomerImpact,
  CostImpact: values.CostImpact,
  RegulatoryCompliance: values.RegulatoryCompliance,
  ImplementationEffort: values.ImplementationEffort,
  ScheduleImpact: values.ScheduleImpact,
});

export const getCreateEcoInputFromValues = (values: EcoFormValues): CreateEcoInput => ({
  Description: values.Description,
  Category: values.Category,
  CategoryState: values.CategoryState,
  Originator: values.Originator,
  EccUser: values.EccUser,
  Priority: values.Priority,
  PriorityScore: values.PriorityScore,
  PriorityAssessment: getPriorityAssessmentFromValues(values),
  Reason: values.Reason,
  FullDescription: values.FullDescription,
  Notes: values.Notes,
});

export const getDialogTitle = (editingDraft?: Eco) =>
  editingDraft ? `Continue Draft ECO ${String(editingDraft.ChangeOrder).slice(-5)}` : 'Create ECO';
