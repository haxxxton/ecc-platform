import { describe, expect, it } from 'vitest';
import { categoryOptions, manufacturingSources } from '../constants';
import { sampleEcos } from './sampleEcos';

describe('sampleEcos', () => {
  it('contains a useful number of fully synthetic records', () => {
    expect(sampleEcos).toHaveLength(96);
    expect(sampleEcos.every((eco) => eco.FullDescription?.includes('synthetic Northstar'))).toBe(
      true,
    );
  });

  it('only uses fictional configured categories and facilities', () => {
    expect(sampleEcos.every((eco) => categoryOptions.includes(eco.Category ?? ''))).toBe(true);
    expect(sampleEcos.every((eco) => manufacturingSources.includes(eco.CategoryState ?? ''))).toBe(
      true,
    );
  });
});
