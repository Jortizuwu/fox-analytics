export interface IsigninResponse {
  status: string
  totalResults: number
  articles: Article[]
}

export interface Article {
  id: number
  source: Source
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: Date
  content: string
}

export interface Source {
  id: null | string
  name: string
}
