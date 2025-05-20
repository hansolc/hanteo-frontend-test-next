'use client';

import React, { useEffect, useRef } from 'react';
import styles from './HeaderTab.module.scss';
import { SwipeIndexProps } from '../types';

interface HeaderTabProps extends SwipeIndexProps {}

const tabItems = ['차트', 'Whook', '이벤트', '뉴스', '스토어', '충전소'];

const HeaderTab = ({ currentIndex, setCurrentIndex }: HeaderTabProps) => {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const el = itemRefs.current[currentIndex];
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [currentIndex]);

  return (
    <ul className={styles.headerTabWrapper}>
      {/* li key 변경하기! */}
      {tabItems.map((tab, idx) => {
        return (
          <li
            key={idx}
            className={`${styles.tabItem} ${idx === currentIndex ? styles.cur : ''}`}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            onClick={() => setCurrentIndex(idx)}
          >
            {tab}
          </li>
        );
      })}
    </ul>
  );
};

export default HeaderTab;
