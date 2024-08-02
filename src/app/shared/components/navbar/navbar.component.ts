import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ThemeState } from '../../../core/models/interfaces/types';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isDarkTheme$: Observable<boolean>;

  constructor(private store: Store<{ theme: ThemeState }>) {
    this.isDarkTheme$ = this.store.pipe(select(state => state.theme.isDarkTheme));
  }

  ngOnInit() {
    this.isDarkTheme$.subscribe(isDark => {
      const themeClass = isDark ? 'dark-theme' : 'light-theme';
      document.body.classList.remove('dark-theme', 'light-theme');
      document.body.classList.add(themeClass);
    });
  }
}
