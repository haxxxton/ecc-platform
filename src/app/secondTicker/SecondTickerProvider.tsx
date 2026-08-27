import { type ReactNode, useEffect, useState } from 'react';
import { createSecondTicker } from './createSecondTicker';
import { SecondTickerContext } from './SecondTickerContext';

type SecondTickerProviderProps = {
  children: ReactNode;
};

const SecondTickerProvider = ({ children }: SecondTickerProviderProps) => {
  const [ticker] = useState(createSecondTicker);

  useEffect(() => () => ticker.destroy(), [ticker]);

  return <SecondTickerContext.Provider value={ticker}>{children}</SecondTickerContext.Provider>;
};

export default SecondTickerProvider;
