import { z } from 'zod';
import { ecoPrioritySchema } from '../../schemas';

export const createEcoFormSchema = z.object({
  Description: z.string().min(1, 'Description is required'),
  Category: z.string().min(1),
  CategoryState: z.string().min(1),
  Originator: z.string().min(1, 'Originator is required'),
  EccUser: z.string().min(1, 'Owner is required'),
  Priority: ecoPrioritySchema,
  PriorityScore: z.string().optional(),
  ProductImpact: z.number(),
  CustomerImpact: z.number(),
  CostImpact: z.number(),
  RegulatoryCompliance: z.number(),
  ImplementationEffort: z.number(),
  ScheduleImpact: z.number(),
  Reason: z.string().min(1, 'Reason is required'),
  FullDescription: z.string().min(1, 'Full description is required'),
  Notes: z.string().optional(),
});
