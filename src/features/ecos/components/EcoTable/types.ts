import type { ReactTable } from '@tanstack/react-table';
import type { Eco } from '../../types';
import { ecoTableFeatures } from './constants';

export type EcoTableProps = {
  ecos: Eco[];
  isLoading: boolean;
  onOpenEco: (eco: Eco) => void;
};

export type EcoTableChildProps = {
  table: ReactTable<typeof ecoTableFeatures, Eco>;
  onOpenEco: (eco: Eco) => void;
};
