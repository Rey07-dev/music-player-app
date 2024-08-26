export type SingleArtist = {
  artists: Array<{
    external_urls: {
      spotify: string
    }
    followers: {
      href: unknown
      total: number
    }
    genres: Array<string>
    id: string
    images: Array<{
      height: number
      url: string
      width: number
    }>
    name: string
    popularity: number
    type: string
    uri: string
  }>
}
