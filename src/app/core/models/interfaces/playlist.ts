export interface Playlist {
  name: string;
  owner: Owner;
  uri: string;
  public: boolean;
  collaborative: boolean;
  followers: Followers;
  tracks: Tracks;
  images: Image[];
  description: string;
}

export interface Owner {
  display_name: string;
  uri: string;
  id: string;
}

export interface Followers {
  total: number;
}

export interface Tracks {
  items: TrackItem[];
  total: number;
}

export interface TrackItem {
  track: Track;
}

export interface Track {
  duration_ms: number;
  type: string;
}

export interface Image {
  height: number | null;
  url: string;
  width: number | null;
}


export interface SpotifyPlayerOptions {
  name: string;
  volume: number;
}

export interface SpotifyPlayerState {
  __zone_symbol__state: boolean;
}

export interface SpotifyPlayer {
  _options: SpotifyPlayerOptions;
  _eventListeners: {
    account_error: Function[];
    authentication_error: Function[];
    autoplay_failed: Function[];
    playback_error: Function[];
    initialization_error: Function[];
    ready: (Function | null)[];
    not_ready: Function[];
    player_state_changed: (Function | null)[];
    progress: Function[];
  };
  _connectionRequests: Record<string, unknown>;
  _getCurrentStateRequests: Record<string, unknown>;
  _getVolumeRequests: Record<string, unknown>;
  _messageHandlers: Record<string, unknown>;
  isLoaded: SpotifyPlayerState;
}
