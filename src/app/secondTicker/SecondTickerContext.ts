import { createContext } from 'react';
import type { SecondTicker } from './types';

export const SecondTickerContext = createContext<SecondTicker | null>(null);
