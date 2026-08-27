import { useLayoutEffect, useRef } from 'react';
import { stickyStackLayout } from './constants';

export function useStickyStack() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scopeTabsRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const header = headerRef.current;
    const scopeTabs = scopeTabsRef.current;
    const filters = filtersRef.current;

    if (!root || !header || !scopeTabs || !filters) return;

    const updateMeasurements = () => {
      root.style.setProperty(stickyStackLayout.variables.headerHeight, `${header.offsetHeight}px`);
      root.style.setProperty(
        stickyStackLayout.variables.scopeTabsHeight,
        `${scopeTabs.offsetHeight}px`,
      );
      root.style.setProperty(
        stickyStackLayout.variables.filtersHeight,
        `${filters.offsetHeight}px`,
      );
    };

    const observer = new ResizeObserver(updateMeasurements);
    observer.observe(header);
    observer.observe(scopeTabs);
    observer.observe(filters);
    updateMeasurements();

    return () => observer.disconnect();
  }, []);

  return {
    filtersRef,
    headerRef,
    rootRef,
    scopeTabsRef,
  };
}
