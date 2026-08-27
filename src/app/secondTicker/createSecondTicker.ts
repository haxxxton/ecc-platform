import type { SecondTicker, SecondTickerCallback } from './types';

const tickIntervalMs = 1_000;

export function createSecondTicker(): SecondTicker {
  const callbacks = new Set<SecondTickerCallback>();
  let timer: ReturnType<typeof setInterval> | undefined;

  const stop = () => {
    if (timer === undefined) return;
    clearInterval(timer);
    timer = undefined;
  };

  const start = () => {
    if (timer !== undefined) return;
    timer = setInterval(() => {
      callbacks.forEach((callback) => callback());
    }, tickIntervalMs);
  };

  return {
    destroy: () => {
      stop();
      callbacks.clear();
    },
    subscribe: (callback) => {
      callbacks.add(callback);
      start();

      return () => {
        callbacks.delete(callback);
        if (!callbacks.size) stop();
      };
    },
  };
}
