import { createReducer, on } from "@ngrx/store";
import {
  nextTrack,
  pauseTrack,
  playTrack,
  previousTrack,
  selectTrack,
  trackEnded,
} from "./playMusic.actions";
import { IAlbumItem, PlayingSongState } from "../../core/models/interfaces/spotify";

export interface PlayMusicState {
  track: IAlbumItem | null;
  isPlaying: boolean;
  detail: IAlbumItem | PlayingSongState | null;
  queue: any[];
}

export const initialPlayMusicState: PlayMusicState = {
  track: null,
  isPlaying: false,
  detail: null,
  queue: [],
};

export const playMusicReducer = createReducer(
  initialPlayMusicState,
  on(selectTrack, (state, { track }) => {
    const trackExistsInQueue = state.queue.some((t) => t.id === track.id);
    return{
    ...state,
    track: track,
    detail: track ,
    queue: trackExistsInQueue ? state.queue : [...state.queue, track],
    isPlaying: true,
  }}),
  on(playTrack, (state) => ({ ...state, isPlaying: true })),
  on(pauseTrack, (state) => ({ ...state, isPlaying: false })),
  on(nextTrack, (state) => {
    if (!state.track || !state.queue.length) return state;
    const currentTrackIndex = state.queue.findIndex((t) => t.id === state.track!.id);
    const nextTrack = state.queue[(currentTrackIndex + 1) % state.queue.length];
    return {
      ...state,
      track: nextTrack,
      isPlaying: true,
    };
  }),
  on(previousTrack, (state) => {
    if (!state.track || !state.queue.length) return state;
    const currentTrackIndex = state.queue.findIndex((t) => t.id === state.track!.id);
    const previousTrack = state.queue[(currentTrackIndex - 1 + state.queue.length) % state.queue.length];
    return {
      ...state,
      track: previousTrack,
      isPlaying: true,
    };
  }),
  on(trackEnded, (state) => {
    if (!state.track || !state.queue.length) return state;
    const currentTrackIndex = state.queue.findIndex((t) => t.id === state.track!.id);
    const nextTrack = state.queue[(currentTrackIndex + 1) % state.queue.length];
    return {
      ...state,
      track: nextTrack,
      isPlaying: true,
    };
  })
);
