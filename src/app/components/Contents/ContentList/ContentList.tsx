'use client';

import { ContentsListResponse } from '@/schema/contents';
import styles from './ContentList.module.scss';
import { ActionResult } from '@/types/action';
import useInfiniteScrollContents from './hooks/useInfiniteScrollContents';
import { ContentsTabs } from '@/types/contents';
import { useEffect, useRef } from 'react';
import useObserve from '@/hooks/useObserver';
import Image from 'next/image';

interface ContentListProps {
  listInfo: ActionResult<ContentsListResponse>;
  tab: ContentsTabs;
}

const ContentList = ({ listInfo, tab }: ContentListProps) => {
  if (listInfo.status === 'error') {
    return <div>error</div>;
  }
  const ref = useRef<HTMLDivElement | null>(null);
  const { contents, limit, skip, total } = listInfo.data;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isFetching,
  } = useInfiniteScrollContents({ tab, initialData: contents, limit, skip });
  const { observe } = useObserve({ observedCallback: fetchNextPage });

  useEffect(() => {
    if (ref.current) {
      observe(ref.current);
    }
  }, [observe]);

  if (error) {
    return (
      <div className={styles.minwidthWrapper}>
        오류가 발생햇습니다. 다시 시도해주세요
      </div>
    );
  }

  return (
    <>
      <div className={styles.contentListWrapper}>
        {data?.pages.map((page, pageIndex) =>
          page.map((item, idx) => (
            <div key={item.id} className={styles.contentListItemWrapper}>
              <Image
                src={item.img}
                width={50}
                height={50}
                alt={`img_${item.id}`}
              />
              <div className={styles.ranking}>{item.ranking}</div>
              <div className={styles.info}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.artist}>{item.artist}</div>
              </div>
            </div>
          ))
        )}
      </div>
      {hasNextPage && <div ref={ref}></div>}
      {isFetchingNextPage && (
        <div style={{ height: '50px' }}>
          데이터를 가져오고 있습니다. 잠시만 기다려주세요
        </div>
      )}
    </>
  );
};

export default ContentList;
