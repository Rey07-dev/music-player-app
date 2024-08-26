export type SpotifyAlbums = {
  albums: IAlbum;
};

export interface IAlbum {
  href: string;
  items: Array<IAlbumItem>;
  limit: number;
  next: string;
  offset: number;
  previous: unknown;
  total: number;
}

export interface IAlbumItem {
  album_type: string;
  artists: Array<IAlbumItemArtists>;
  available_markets: Array<string>;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<IAlbumItemImages>;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface IAlbumItemArtists {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface IAlbumItemImages {
  height: number;
  url: string;
  width: number;
}

export type PlayTrack = {
  track: IAlbumItem;
  type: string;
};

export type PlayingSongState = {
  timestamp: number;
  duration: number;
  position: number;
  paused: boolean;
  shuffle: boolean;
  shuffle_mode: number;
  loading: boolean;
  repeat_mode: number;
  playback_id: string;
  playback_quality: string;
  playback_speed: number;

  track_window: {
    current_track: TrackInfo;
    next_tracks: Array<TrackInfo>;
    previous_tracks: Array<TrackInfo>;
  };

  context: {
    uri: string;
    metadata: {};
  };

  restrictions: PlaybackRestrictions;
  disallows: PlaybackDisallows;
  playback_features: PlaybackFeatures;
};

export type TrackWindow = {
  current_track: TrackInfo;
  next_tracks: Array<TrackInfo>;
  previous_tracks: Array<TrackInfo>;
};

export type TrackInfo = {
  id: string;
  uri: string;
  type: string;
  uid: string;
  linked_from: {
    uri: string;
    id: string;
  };
  media_type: string;
  track_type: string;
  name: string;
  duration_ms: number;
  artists: Array<{
    name: string;
    uri: string;
    url: string;
  }>;
  album: {
    name: string;
    uri: string;
    images: Array<{
      size: string;
      url: string;
      height: number;
      width: number;
    }>;
  };
  is_playable: boolean;
  metadata: {};
};

export type PlaybackRestrictions = {
  disallow_seeking_reasons: Array<unknown>;
  disallow_skipping_next_reasons: Array<unknown>;
  disallow_skipping_prev_reasons: Array<unknown>;
  disallow_toggling_repeat_context_reasons: Array<string>;
  disallow_toggling_repeat_track_reasons: Array<string>;
  disallow_toggling_shuffle_reasons: Array<string>;
  disallow_peeking_next_reasons: Array<unknown>;
  disallow_peeking_prev_reasons: Array<unknown>;
  undefined: Array<string>;
  disallow_resuming_reasons: Array<string>;
};

export type PlaybackDisallows = {
  seeking: boolean;
  skipping_next: boolean;
  skipping_prev: boolean;
  toggling_repeat_context: boolean;
  toggling_repeat_track: boolean;
  toggling_shuffle: boolean;
  peeking_next: boolean;
  peeking_prev: boolean;
  undefined: boolean;
  resuming: boolean;
};

export type PlaybackFeatures = {
  hifi_status: string;
  playback_speed: {
    current: number;
    selected: number;
    restricted: boolean;
  };
  signal_ids: Array<any>;
  modes: {};
};

export type CurrentTrackPlaying = {
  timestamp: number;
  context: {
    external_urls: {
      spotify: string;
    };
    href: string;
    type: string;
    uri: string;
  };
  progress_ms: number;
  item: {
    album: IAlbumItem;
    artists: Array<IAlbumItemArtists>;
    available_markets: Array<string>;
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  };
  currently_playing_type: string;
  actions: {
    disallows: {
      pausing: boolean;
      skipping_prev: boolean;
    };
  };
  is_playing: boolean;
};
