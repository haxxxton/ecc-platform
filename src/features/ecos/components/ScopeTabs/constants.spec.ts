import { describe, expect, it } from 'vitest';
import { scopeTabDefinitions } from './constants';
import { shouldHighlightScopeTab } from './logic';

describe('scopeTabDefinitions', () => {
  it('defines each mutually exclusive scope once and defaults to active first', () => {
    const scopes = scopeTabDefinitions.map((definition) => definition.scope);

    expect(scopes[0]).toBe('active');
    expect(new Set(scopes).size).toBe(scopes.length);
  });

  it('highlights former attention scopes only when they have records', () => {
    const signoff = scopeTabDefinitions.find((definition) => definition.scope === 'signoff');
    const active = scopeTabDefinitions.find((definition) => definition.scope === 'active');

    expect(signoff).toBeDefined();
    expect(active).toBeDefined();
    expect(shouldHighlightScopeTab(signoff!, 1)).toBe(true);
    expect(shouldHighlightScopeTab(signoff!, 0)).toBe(false);
    expect(shouldHighlightScopeTab(active!, 10)).toBe(false);
  });
});
