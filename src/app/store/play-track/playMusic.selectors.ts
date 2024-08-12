import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PlayMusicState } from './playMusic.reducer';

export const selectPlayerState = createFeatureSelector<PlayMusicState>('player');

export const selectCurrentTrack = createSelector(
  selectPlayerState,
  (state: PlayMusicState) => state
);

export const selectIsPlaying = createSelector(
  selectPlayerState,
  (state: PlayMusicState) => state.isPlaying
);

export const selectTrackQueue = createSelector(
  selectPlayerState,
  (state: PlayMusicState) => state.queue
);
