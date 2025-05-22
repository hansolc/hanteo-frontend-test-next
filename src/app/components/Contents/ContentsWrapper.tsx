'use client';

import React from 'react';
import { ContentsListResponse } from '@/schema/contents';
import { useSearchParams } from 'next/navigation';
import useSearchParamsByKeys from '@/components/SwipeWrapper/hooks/useSearchParamsByKeys';
import { ContentsTabs } from '@/types/contents';
import SwipeWrapper from '@/components/SwipeWrapper/SwipeWrapper';
import { VALID_TABS } from '@/constants/tabs';
import Section from '@/components/Section/Section';
import { ActionResult } from '@/types/action';
import ContentList from './ContentList/ContentList';

interface ContentsWrapperProps {
  initialData: ActionResult<ContentsListResponse>;
}

const ContentsWrapper = ({ initialData }: ContentsWrapperProps) => {
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
    <SwipeWrapper onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
      <Section bg="lightgray">
        <Section.Title>콘텐츠 큐레이션 제목</Section.Title>
        <ContentList listInfo={initialData} tab={currentTab} />
      </Section>
    </SwipeWrapper>
  );
};

export default ContentsWrapper;
