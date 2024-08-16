import { createSelector, createFeatureSelector } from "@ngrx/store";
import { PlayMusicState } from "./playMusic.reducer";

export const selectPlayerState = createFeatureSelector<PlayMusicState>("music");

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

export const selectCurrentTrackDetails = createSelector(
  selectPlayerState,
  (state: PlayMusicState) => state.detail
);

export const selectArtistName = createSelector(
  selectPlayerState,
  (state: PlayMusicState) =>
    state.track?.artists[0]?.name !== undefined ? state.track?.artists[0]?.name :
    state.detail
);

export const selectTrackName = createSelector(
  selectPlayerState,
  (state: PlayMusicState) =>
    state.track?.name !== undefined ? state.track?.name :
    state.detail
)
