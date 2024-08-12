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

export interface PlayMusicState {
  track: Track | null;
  isPlaying: boolean;
  queue: Track[];
}

export const initialPlayMusicState: PlayMusicState = {
  track: null,
  isPlaying: false,
  queue: [],
};

export const playMusicReducer = createReducer(
  initialPlayMusicState,
  on(selectTrack, (state, { track }) => ({
    ...state,
    currentTrack: track,
    queue: state.queue.includes(track) ? state.queue : [...state.queue, track],
    isPlaying: true,
  })),
  on(playTrack, (state) => ({
    ...state,
    isPlaying: true,
  })),
  on(pauseTrack, (state) => ({ ...state, isPlaying: false })),
  on(nextTrack, (state) => {
    const index = state.queue.indexOf(state.track!);
    const nextTrack = state.queue[index + 1] || state.queue[0];
    return {
      ...state,
      currentTrack: nextTrack,
      isPlaying: true,
    };
  }),
  on(previousTrack, (state) => {
    const index = state.queue.indexOf(state.track!);
    const previousTrack =
      state.queue[index - 1] || state.queue[state.queue.length - 1];
    return {
      ...state,
      currentTrack: previousTrack,
      isPlaying: true,
    };
  }),
  on(trackEnded, (state) => {
    const currentTrack = state.queue.indexOf(state.track!);
    const nextTrack = state.queue[currentTrack + 1] || state.queue[0];
    return {
      ...state,
      currentTrack: nextTrack,
      isPlaying: true,
    };
  })
);
