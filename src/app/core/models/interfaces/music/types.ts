import { Track } from "./tracks";

export interface MusicList {
  name: string;
  icon: string;
  link: string;
  label: string;
}

export interface Top50Songs {
  title: string
  artist: string
  artistId: number
  album: string
  albumId: number
  genre: string
  release_year: number
  duration: string
  image: string
  ratings: number
  audioUrl: string
}
