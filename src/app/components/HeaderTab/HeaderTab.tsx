'use client';

import React, { useEffect, useRef } from 'react';
import styles from './HeaderTab.module.scss';
import { SwipeIndexProps } from '../types';
import { ContentsTabs } from '@/types/contents';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useSearchParamsByKeys from '@/components/SwipeWrapper/hooks/useSearchParamsByKeys';

interface HeaderTabProps<T extends string> {
  tabs: T[];
}

const parseTabsToKr = <T,>(tab: T) => {
  switch (tab) {
    case 'charge':
      return '충전소';
    case 'events':
      return '이벤트';
    case 'charts':
      return '차트';
    case 'news':
      return '뉴스';
    case 'stores':
      return '스토어';
    case 'whook':
      return 'Whook';
    default:
      return '오류';
  }
};

const HeaderTab = <T extends string>({ tabs }: HeaderTabProps<T>) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement | null>(null);

  const changeTab = (newTab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', newTab);

    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (!listRef.current) return;

    const activeItem = listRef.current.querySelector(`.${styles.cur}`);
    if (activeItem) {
      activeItem.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [searchParams.toString()]);

  return (
    <div className={styles.headerWrapper}>
      <ul className={styles.headerTab} ref={listRef}>
        {tabs.map((tab, idx) => {
          return (
            <li
              key={`${tab}_${idx}_key`}
              className={`${styles.tabItem} ${searchParams.get('tab') === tab ? styles.cur : ''}`}
              onClick={() => changeTab(tab)}
            >
              {parseTabsToKr<T>(tab)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HeaderTab;
