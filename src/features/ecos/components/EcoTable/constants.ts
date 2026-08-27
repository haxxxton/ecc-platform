import {
  columnSizingFeature,
  createColumnHelper,
  createSortedRowModel,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
} from '@tanstack/react-table';
import type { Eco } from '../../types';

export const ecoTableFeatures = tableFeatures({
  columnSizingFeature,
  rowSortingFeature,
  sortFns: { alphanumeric: sortFn_alphanumeric },
  sortedRowModel: createSortedRowModel(),
});

export const ecoTableColumnHelper = createColumnHelper<typeof ecoTableFeatures, Eco>();

export const ecoTableColumnSizes = {
  eco: 100,
  category: 140,
  status: 150,
  stage: 130,
  actionRequired: 260,
  owner: 180,
  assignedTo: 180,
  age: 90,
  priority: 130,
  description: 320,
} as const;

export const ecoTableSkeletonRows = Array.from({ length: 8 }, (_, index) => index);
