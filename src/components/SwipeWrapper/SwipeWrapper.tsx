import useSwipe, { SwipeProps } from '@/hooks/useSwipe';
import React, { PropsWithChildren } from 'react';

interface SwipeWrapperPrpos extends PropsWithChildren<SwipeProps> {
  className?: string;
}

const SwipeWrapper = ({ children, className, ...rest }: SwipeWrapperPrpos) => {
  const { handleTouchStart, handleTouchEnd } = useSwipe({ ...rest });
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={className}
    >
      {children}
    </div>
  );
};

export default SwipeWrapper;
