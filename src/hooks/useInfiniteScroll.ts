import { useInfiniteQuery } from '@tanstack/react-query';

interface UseInfiniteScrollProps<T> {
  queryKey: string[];
  queryFn: (pageParam: number) => Promise<T>;
  initialData: T;
  getNextPageParam: (lastPage: T, allPages: T[]) => number | undefined;
}

const useInfiniteScroll = <T>({
  queryKey,
  queryFn,
  initialData,
  getNextPageParam,
}: UseInfiniteScrollProps<T>) => {
  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 0 }) => {
      return await queryFn(pageParam);
    },
    initialPageParam: 0,
    getNextPageParam,
    initialData: {
      pages: [initialData],
      pageParams: [0],
    },
  });
};

export default useInfiniteScroll;
