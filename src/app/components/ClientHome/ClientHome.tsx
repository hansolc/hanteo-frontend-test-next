'use client';

import React from 'react';
import HeaderTab from '../HeaderTab/HeaderTab';
import Banner from '../Banner/Banner';
import ContentsArea from '../ContentsArea/ContentsArea';
import { ContentsListResponse } from '@/schema/contents';
import { useSearchParams } from 'next/navigation';
import useSearchParamsByKeys from '@/components/SwipeWrapper/hooks/useSearchParamsByKeys';
import { ContentsTabs } from '@/types/contents';
import SwipeWrapper from '@/components/SwipeWrapper/SwipeWrapper';
import { VALID_TABS } from '@/constants/tabs';

interface ClinetHomeProps {
  initialData: ContentsListResponse['contents'];
}

const ClientHome = ({ initialData }: ClinetHomeProps) => {
  const searchParams = useSearchParams();
  const { setParam } = useSearchParamsByKeys<{ tab: ContentsTabs }>({
    initial: {
      tab: (searchParams.get('tab') as ContentsTabs) ?? 'charts',
    },
    validKeys: {
      tab: VALID_TABS,
    },
  });
  const currentTab = searchParams.get('tab') as ContentsTabs;
  const currentIndex = VALID_TABS.indexOf(currentTab);

  const onSwipeLeft = () => {
    if (currentIndex < VALID_TABS.length - 1) {
      setParam('tab', VALID_TABS[currentIndex + 1]);
    }
  };

  const onSwipeRight = () => {
    if (currentIndex > 0) {
      setParam('tab', VALID_TABS[currentIndex - 1]);
    }
  };

  return (
    <>
      <HeaderTab<ContentsTabs> tabs={VALID_TABS} />
      <main>
        <Banner />
        <SwipeWrapper onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
          <ContentsArea listInfo={initialData} />
        </SwipeWrapper>
      </main>
    </>
  );
};

export default ClientHome;
