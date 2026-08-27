import { useContext } from 'react';
import { SecondTickerContext } from './SecondTickerContext';

export function useSecondTicker() {
  const ticker = useContext(SecondTickerContext);
  if (!ticker) throw new Error('useSecondTicker must be used within SecondTickerProvider.');
  return ticker;
}
