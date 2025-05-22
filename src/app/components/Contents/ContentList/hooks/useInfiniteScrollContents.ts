import { getContentsBytab } from '@/actions/contents';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { ContentsListResponse } from '@/schema/contents';
import { ContentsTabs } from '@/types/contents';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseInfiniteScrollContentsProps {
  tab: ContentsTabs;
  initialData: ContentsListResponse['contents'];
  limit: number;
  skip: number;
}

const CONTENTS_PER_PAGE = 30;

const useInfiniteScrollContents = ({
  tab,
  initialData,
  limit,
  skip,
}: UseInfiniteScrollContentsProps) => {
  return useInfiniteScroll<ContentsListResponse['contents']>({
    queryKey: ['contents', tab],
    queryFn: async (pageParam) => {
      const res = await getContentsBytab({
        tab,
        limit,
        skip: pageParam,
      });
      if (res.status === 'error') throw new Error(res.error);
      return res.data.contents;
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === limit ? pages.length * limit : undefined;
    },
    initialData,
  });
};

export default useInfiniteScrollContents;
