import { createReducer, on } from '@ngrx/store';
import { authenticateSuccess, authenticateFailure } from './spotify.actions';

export interface SpotifyState {
  token: string | null;
  error: string | null;
}

const initialState: SpotifyState = {
  token: null,
  error: null,
};

export const spotifyReducer = createReducer(
  initialState,
  on(authenticateSuccess, (state, { token }) => ({ ...state, token, error: null })),
  on(authenticateFailure, (state, { error }) => ({ ...state, token: null, error })),
);
