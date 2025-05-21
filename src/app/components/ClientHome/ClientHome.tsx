'use client';

import React, { useState, useRef } from 'react';
import HeaderTab from '../HeaderTab/HeaderTab';
import Banner from '../Banner/Banner';
import ContentsArea from '../ContentsArea/ContentsArea';
import useSwipe from '@/hooks/useSwipe';
import { ContentsListResponse } from '@/schema/contents';

interface ClinetHomeProps {
  initialData: ContentsListResponse['contents'];
}

const tabCount = 6;

const ClientHome = ({ initialData }: ClinetHomeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { handleTouchStart, handleTouchEnd } = useSwipe({
    onSwipeLeft: () => {
      if (currentIndex < tabCount - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    },
    onSwipeRight: () => {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    },
  });

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ height: '100vh' }}
    >
      <HeaderTab
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <main>
        <Banner />
        <ContentsArea
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          listInfo={initialData}
        />
      </main>
    </div>
  );
};

export default ClientHome;
