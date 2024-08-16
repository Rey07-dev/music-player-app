import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ThemeState } from '../../../core/models/interfaces/types';
import { toggleTheme } from '../../../store/theme/theme.actions';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css'
})
export class ThemeToggleComponent {
  isDarkTheme$: Observable<boolean>;
  isDarkTheme: boolean = false;

  constructor(private store: Store<{ theme: ThemeState }>) {
    this.isDarkTheme$ = this.store.pipe(select(state => {
      return state.theme.isDarkTheme
    }));
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.store.dispatch(toggleTheme());
  }
}
