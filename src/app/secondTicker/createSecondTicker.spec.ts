import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createSecondTicker } from './createSecondTicker';

describe('createSecondTicker', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('notifies every subscriber from one interval', () => {
    const ticker = createSecondTicker();
    const first = vi.fn();
    const second = vi.fn();

    ticker.subscribe(first);
    ticker.subscribe(second);
    vi.advanceTimersByTime(3_000);

    expect(first).toHaveBeenCalledTimes(3);
    expect(second).toHaveBeenCalledTimes(3);
    expect(vi.getTimerCount()).toBe(1);
    ticker.destroy();
  });

  it('stops the interval after the final subscriber unregisters', () => {
    const ticker = createSecondTicker();
    const callback = vi.fn();
    const unsubscribe = ticker.subscribe(callback);

    unsubscribe();
    vi.advanceTimersByTime(2_000);

    expect(callback).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('clears subscribers and the interval when destroyed', () => {
    const ticker = createSecondTicker();
    const callback = vi.fn();
    ticker.subscribe(callback);

    ticker.destroy();
    vi.advanceTimersByTime(2_000);

    expect(callback).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });
});
