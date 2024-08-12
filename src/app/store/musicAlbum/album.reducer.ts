import { createReducer, on } from '@ngrx/store';
import * as albumActions from './album.actions';
import { initialState } from './album.state';



export const albumReducer = createReducer(
  initialState,
  on(albumActions.albumRequestSuccess, (state, response ) => ({
    ...state,
    albums: response.response,
    loading: false,
    error: null
  })),
  on(albumActions.albumRequestFailure, (state, { error }) => ({
    ...state,
    loading: false,
    albums: null,
    error: error
  })),
  on(albumActions.albumRequestStart, (state) => ({
    ...state,
    error: null,
    albums: null,
    loading: true
  }))
);
