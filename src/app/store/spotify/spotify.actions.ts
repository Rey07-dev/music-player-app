// src/app/store/spotify.actions.ts
import { createAction, props } from "@ngrx/store";

export const authenticate = createAction("[Spotify] Authenticate");

export const authenticateSuccess = createAction(
  "[Spotify] Authenticate Success",
  props<{ token: string }>()
);
export const authenticateFailure = createAction(
  "[Spotify] Authenticate Failure",
  props<{ error: string }>()
);
