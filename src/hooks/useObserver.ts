'use client';

import { useEffect, useRef } from 'react';

interface ObserveProps {
  threshold?: number;
  observedCallback: () => void;
}

const useObserve = ({ threshold = 0.1, observedCallback }: ObserveProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observedCallback();
          observerRef.current?.disconnect();
        }
      },
      { threshold }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, observedCallback]);

  const observe = (element: HTMLElement) => {
    observerRef.current?.observe(element);
  };

  return { observe };
};

export default useObserve;
