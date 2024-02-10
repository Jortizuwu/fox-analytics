import { api } from '@/shared/common/api'
import { IsigninResponse } from '@/shared/types/interface'

export const newServices = {
  listNews: async ({ pageParam }: { pageParam: number }) => {
    const { data } = await api.get<IsigninResponse>(
      `/everything?q=a&pageSize=20&page=${pageParam}&apiKey=4931cae34d7a4d24b208d55ce8bcab66`,
    )

    return data
  },
}
