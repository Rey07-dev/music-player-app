import { createReducer, on } from "@ngrx/store";
import { Track } from "../../core/models/interfaces/music/tracks";
import {
  nextTrack,
  pauseTrack,
  playTrack,
  previousTrack,
  selectTrack,
  trackEnded,
} from "./playMusic.actions";
import { SpotifyTrack } from "../../core/models/interfaces/spotify";

export interface PlayMusicState {
  track: SpotifyTrack | null;
  isPlaying: boolean;
  queue: SpotifyTrack[];
}

export const initialPlayMusicState: PlayMusicState = {
  track: null,
  isPlaying: false,
  queue: [],
};

export const playMusicReducer = createReducer(
  initialPlayMusicState,
  on(selectTrack, (state, { track }) => (
    console.log('track',track, state),
    {
    ...state,
    track: track,
    queue: state.queue.includes(track) ? state.queue : [...state.queue, track],
    isPlaying: true,
  })),
  on(playTrack, (state) => ({ ...state,isPlaying: true })),
  on(pauseTrack, (state) => ({ ...state, isPlaying: false })),
  on(nextTrack, (state) => {
    const index = state.queue.indexOf(state.track!);
    const nextTrack = state.queue[index + 1] || state.queue[0];
    return {
      ...state,
      track: nextTrack,
      queue: state.queue,
      isPlaying: true,
    };
  }),
  on(previousTrack, (state) => {
    const index = state.queue.indexOf(state.track!);
    const previousTrack =
      state.queue[index - 1] || state.queue[state.queue.length - 1];
    return {
      ...state,
      track: previousTrack,
      queue: state.queue,
      isPlaying: true,
    };
  }),
  on(trackEnded, (state) => {
    const currentTrack = state.queue.indexOf(state.track!);
    const nextTrack = state.queue[currentTrack + 1] || state.queue[0];
    return {
      ...state,
      track: nextTrack,
      queue: state.queue,
      isPlaying: true,
    };
  })
);
