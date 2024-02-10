import { useInfiniteQuery } from 'react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { newServices } from '@/shared/service/news'

export function useListNews() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
    refetch,
  } = useInfiniteQuery(
    QUERY_KEYS.NEW,
    ({ pageParam = 1 }) => newServices.listNews({ pageParam }),
    {
      getNextPageParam: lastPage => lastPage,
      refetchInterval: false,
    },
  )
  const items = data?.pages.flatMap(page =>
    page.articles.map(item => ({
      ...item,
    })),
  )

  return {
    isLoading,
    news: items,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    refetch,
  }
}
