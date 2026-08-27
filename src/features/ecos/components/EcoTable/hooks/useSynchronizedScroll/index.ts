import { type UIEvent, useRef } from 'react';

export function useSynchronizedScroll() {
  const bodyScrollerRef = useRef<HTMLDivElement>(null);
  const headerScrollerRef = useRef<HTMLDivElement>(null);

  const syncBodyToHeader = (event: UIEvent<HTMLDivElement>) => {
    if (headerScrollerRef.current) {
      headerScrollerRef.current.scrollLeft = event.currentTarget.scrollLeft;
    }
  };

  const syncHeaderToBody = (event: UIEvent<HTMLDivElement>) => {
    if (bodyScrollerRef.current) {
      bodyScrollerRef.current.scrollLeft = event.currentTarget.scrollLeft;
    }
  };

  return {
    bodyScrollerRef,
    headerScrollerRef,
    syncBodyToHeader,
    syncHeaderToBody,
  };
}
