export interface SpotifyImage {
  height: number | null;
  url: string;
  width: number | null;
}

export interface SpotifyExternalUrls {
  spotify: string;
}

export interface SpotifyOwner {
  display_name: string;
  external_urls: SpotifyExternalUrls;
  id: string;
  type: string;
  uri: string;
}

export interface SpotifyTracks {
  total: number;
}

export interface SpotifyPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: SpotifyExternalUrls;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: SpotifyOwner;
  primary_color: string | null;
  public: boolean | null;
  snapshot_id: string;
  tracks: SpotifyTracks;
  type: string;
  uri: string;
}

export interface SpotifyContent<T> {
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SpotifyGenreSection {
  content: SpotifyContent<SpotifyPlaylist>;
  custom_fields: any[];
  external_urls: SpotifyExternalUrls | null;
  id: string;
  images: SpotifyImage[];
  name: string;
  rendering: string;
  tag_line: string | null;
  type: string;
}

export interface SpotifyGenreData {
  content: SpotifyContent<SpotifyGenreSection>;
  custom_fields: unknown[];
  external_urls: SpotifyExternalUrls | null;
  id: string;
  images: SpotifyImage[];
  name: string | null;
  rendering: string;
  tag_line: string | null;
  type: string;
}
