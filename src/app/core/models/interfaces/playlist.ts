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
