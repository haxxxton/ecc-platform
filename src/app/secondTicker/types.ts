export type SecondTickerCallback = () => void;

export type SecondTicker = {
  destroy: () => void;
  subscribe: (callback: SecondTickerCallback) => () => void;
};
