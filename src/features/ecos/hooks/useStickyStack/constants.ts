export const stickyStackLayout = {
  variables: {
    headerHeight: '--eco-header-height',
    scopeTabsHeight: '--eco-scope-tabs-height',
    filtersHeight: '--eco-filters-height',
  },
  fallbackHeights: {
    header: 72,
    scopeTabs: 74,
    filters: 152,
  },
  top: {
    header: 0,
    scopeTabs: 'var(--eco-header-height)',
    filters: 'calc(var(--eco-header-height) + var(--eco-scope-tabs-height))',
    tableHeader:
      'calc(var(--eco-header-height) + var(--eco-scope-tabs-height) + var(--eco-filters-height))',
  },
  zIndex: {
    header: 1100,
    scopeTabs: 1090,
    filters: 1080,
    tableHeader: 1070,
  },
} as const;
