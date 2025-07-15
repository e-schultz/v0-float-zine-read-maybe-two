export interface Zine {
  id: string
  title: string
  issue?: string
  subtitle?: string
  author?: string
  date?: string
  description?: string
  coverImage: string
  pages: string[]
  format: "image" | "markdown"
}

export interface ZineMetadata {
  id: string
  title: string
  issue?: string
  subtitle?: string
  author?: string
  date?: string
  description?: string
  coverImage: string
  pageCount: number
  format: "image" | "markdown"
}
