export type SpotifyAlbums = {
  albums: {
    href: string
    items: Array<{
      album_type: string
      artists: Array<{
        external_urls: {
          spotify: string
        }
        href: string
        id: string
        name: string
        type: string
        uri: string
      }>
      available_markets: Array<string>
      external_urls: {
        spotify: string
      }
      href: string
      id: string
      images: Array<{
        height: number
        url: string
        width: number
      }>
      name: string
      release_date: string
      release_date_precision: string
      total_tracks: number
      type: string
      uri: string
    }>
    limit: number
    next: string
    offset: number
    previous: any
    total: number
  }
}

export interface SpotifyTrack {
  album_type: string
  artists: Array<{
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    name: string
    type: string
    uri: string
  }>
  available_markets: Array<string>
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: Array<{
    height: number
    url: string
    width: number
  }>
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}


export type PlayTrack = {
  track: {
    album_type: string
    artists: Array<{
      external_urls: {
        spotify: string
      }
      href: string
      id: string
      name: string
      type: string
      uri: string
    }>
    available_markets: Array<string>
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    images: Array<{
      height: number
      url: string
      width: number
    }>
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string
  }
  type: string
}
