import type { ScopeTabDefinition } from './types';

export function shouldHighlightScopeTab(definition: ScopeTabDefinition, count: number) {
  return definition.highlightWhenNonZero === true && count > 0;
}
