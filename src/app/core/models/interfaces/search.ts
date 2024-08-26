export interface ImageObject {
  url: string;
  height?: number;
  width?: number;
}

export interface ExternalUrlObject {
  spotify: string;
}

export interface SimplifiedAlbumObject {
  album_type: string;
  artists: SimplifiedArtistObject[];
  available_markets: string[];
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface SimplifiedArtistObject {
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface SimplifiedTrackObject {
  artists: SimplifiedArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface SearchResponse {
  tracks?: {
    href: string;
    items: SimplifiedTrackObject[];
    limit: number;
    next?: string;
    offset: number;
    previous?: string;
    total: number;
  };
  albums?: {
    href: string;
    items: SimplifiedAlbumObject[];
    limit: number;
    next?: string;
    offset: number;
    previous?: string;
    total: number;
  };
  artists?: {
    href: string;
    items: SimplifiedArtistObject[];
    limit: number;
    next?: string;
    offset: number;
    previous?: string;
    total: number;
  };
}
