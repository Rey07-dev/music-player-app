import { createAction, props } from "@ngrx/store";
import { Track } from "../../core/models/interfaces/music/tracks";


export const selectTrack = createAction(
  '[Play Track] Play Track',
  props<{ track: Track }>()
);

export const playTrack = createAction('[Play Track] Play Track');

export const pauseTrack = createAction('[Play Track] Pause Track');

export const stopTrack = createAction('[Play Track] Stop Track');

export const nextTrack = createAction('[Play Track] Next Track');

export const previousTrack = createAction('[Play Track] Previous Track');

export const trackEnded = createAction('[Play Track] Track Ended');
