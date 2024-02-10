import { api } from '@/shared/common/api'
import { IsigninResponse } from '@/shared/types/interface'
import { getEnv } from '@/shared/utils/get-env'

const API_KEY = getEnv('EXPO_PUBLIC_API_KEY')

export const newServices = {
  listNews: async ({ pageParam }: { pageParam: number }) => {
    const { data } = await api.get<IsigninResponse>(
      `/everything?q=a&pageSize=20&page=${pageParam}&apiKey=${API_KEY}`,
    )

    return data
  },
}
