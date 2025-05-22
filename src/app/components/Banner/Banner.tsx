'use client';

import Section from '@/components/Section/Section';
import React, { useEffect, useState } from 'react';
import styles from './Banner.module.scss';
import Image from 'next/image';

const banners = ['배너 1', '배너 2', '배너 3'];

const Banner = () => {
  const [index, setIndex] = useState(0);
  const total = banners.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <Section bg="secondary">
      <div
        className={styles.slideContainer}
        style={{
          transform: `translateX(-${index * (100 / total)}%)`,
        }}
      >
        {banners.map((_, idx) => (
          <div key={idx} className={styles.slideItem}>
            <div className={styles.imageWrapper}>
              <Image src="/sample.jpg" fill objectFit="cover" alt="alt" />
            </div>
            <div className={styles.contentWrapper}>
              <div className={styles.contentTop}>
                <div className={styles.bannerTitle}>
                  [M COUNTDOWN] 10월 2주차 엠카 사전등록
                </div>
                <div className={styles.bannerCTA}>투표하기</div>
              </div>
              <div className={styles.bannerDate}>
                2020.04.02 17:00 ~ 2020.04.02 17:00 (KST)
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Banner;
