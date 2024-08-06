import { createReducer, on } from '@ngrx/store';
import { toggleTheme } from './theme.actions';
import { ThemeState } from '../../core/models/interfaces/types';


export const initialState: ThemeState = {
  isDarkTheme: false,
};

export const themeReducer = createReducer(
  initialState,
  on(toggleTheme, state => ({ isDarkTheme: !state.isDarkTheme }))
);
