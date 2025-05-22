'use client';

import Section from '@/components/Section/Section';
import React, { useEffect, useState } from 'react';
import styles from './Banner.module.scss';
import Image from 'next/image';
import sample from '/public/sample.jpg';
import Link from 'next/link';

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
          <Link
            key={`banner_item_${idx}`}
            className={styles.slideItem}
            href={`/banner/${idx + 1}`}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={sample}
                fill
                alt="alt"
                className={styles.image}
                priority
              />
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
          </Link>
        ))}
      </div>
      <div className={styles.dotContainer}>
        {banners.map((_, idx) => (
          <span
            key={`banner_slide_dot_${idx}`}
            className={`${styles.dot} ${index === idx ? styles.active : ''}`}
          />
        ))}
      </div>
    </Section>
  );
};

export default Banner;
