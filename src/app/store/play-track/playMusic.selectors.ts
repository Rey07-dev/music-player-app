import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PlayMusicState } from './playMusic.reducer';

export const selectPlayerState = createFeatureSelector<PlayMusicState>('music');

export const selectCurrentTrack = createSelector(
  selectPlayerState,
  (state: PlayMusicState) => state.track
);

export const selectIsPlaying = createSelector(
  selectPlayerState,
  (state: PlayMusicState) => state.isPlaying
);

export const selectTrackQueue = createSelector(
  selectPlayerState,
  (state: PlayMusicState) => state.queue
);
