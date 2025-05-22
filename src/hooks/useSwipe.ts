'use client';

import React, { useRef } from 'react';

export interface SwipeProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

const useSwipe = ({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: SwipeProps) => {
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;

    if (deltaX < -threshold) {
      // 좌로 스와이프: 다음 탭
      onSwipeLeft?.();
    } else if (deltaX > threshold) {
      // 우로 스와이프: 이전 탭
      onSwipeRight?.();
    }

    touchStartX.current = null;
  };

  return {
    handleTouchStart,
    handleTouchEnd,
  };
};

export default useSwipe;
