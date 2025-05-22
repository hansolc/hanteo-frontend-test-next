import { getContentsBytab } from '@/actions/contents';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { ContentsListResponse } from '@/schema/contents';
import { ContentsTabs } from '@/types/contents';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseInfiniteScrollContentsProps {
  tab: ContentsTabs;
  initialData: ContentsListResponse['contents'];
}

const CONTENTS_PER_PAGE = 30;

const useInfiniteScrollContents = ({
  tab,
  initialData,
}: UseInfiniteScrollContentsProps) => {
  return useInfiniteScroll<ContentsListResponse['contents']>({
    queryKey: ['contents', tab],
    queryFn: async (pageParam) => {
      const res = await getContentsBytab({
        tab,
        limit: CONTENTS_PER_PAGE,
        skip: pageParam,
      });
      if (res.status === 'error') throw new Error(res.error);
      return res.data.contents;
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === CONTENTS_PER_PAGE
        ? pages.length * CONTENTS_PER_PAGE
        : undefined;
    },
    initialData,
  });
};

export default useInfiniteScrollContents;
