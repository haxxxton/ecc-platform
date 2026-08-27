import { z } from 'zod';

export const knownEcoStatusValues = ['NEW', 'IN PROGRESS', 'COMPLETE', 'ON HOLD', 'DRAFT'] as const;

export const ecoPriorityValues = ['1-High', '2-Medium', '3-Low'] as const;

export const workflowActionValues = ['APPROVED', 'REJECTED', 'CHANGES REQUESTED'] as const;

export const knownEcoStatusSchema = z.enum(knownEcoStatusValues);

export const ecoPrioritySchema = z.enum(ecoPriorityValues);

export const workflowActionSchema = z.enum(workflowActionValues);
