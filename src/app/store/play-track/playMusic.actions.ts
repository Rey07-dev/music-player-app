import { createAction, props } from "@ngrx/store";
import { Track } from "../../core/models/interfaces/music/tracks";
import { PlayTrack, SpotifyTrack } from "../../core/models/interfaces/spotify";


export const selectTrack = createAction(
  '[Play Track] Play Track',
  props<{ track: SpotifyTrack }>()
);

export const playTrack = createAction('[Play Track] Play Track');

export const pauseTrack = createAction('[Pause Track] Pause Track');

export const stopTrack = createAction('[Stop Track] Stop Track');

export const nextTrack = createAction('[Next Track] Next Track');

export const previousTrack = createAction('[Previous Track] Previous Track');

export const trackEnded = createAction('[End Track] Track Ended');
