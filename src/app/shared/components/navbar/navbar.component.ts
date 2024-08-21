import { AuthService } from './../../../core/models/services/spotify/auth.service';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ThemeState } from '../../../core/models/interfaces/types';
import { SpotifyState } from '../../../store/spotify/spotify.reducer';
import { authenticate } from '../../../store/spotify/spotify.actions';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isDarkTheme$: Observable<boolean>;
  isDrop: boolean = false;

  constructor(private store: Store<{ theme: ThemeState ,spotify: SpotifyState }>,
    private authService: AuthService
  ) {
    this.isDarkTheme$ = this.store.pipe(select(state => state.theme.isDarkTheme));
  }

  ngOnInit() {
    this.isDarkTheme$.subscribe(isDark => {
      const themeClass = isDark ? 'dark-theme' : 'light-theme';
      document.body.classList.remove('dark-theme', 'light-theme');
      document.body.classList.add(themeClass);
    });
  }

  token$ = this.store.select(state => state.spotify.token);

  toggleProfile() {
    this.isDrop = !this.isDrop;
  }

  login() {
    this.store.dispatch(authenticate());
  }

  logout() {
    this.authService.logout();
    this.isDrop = false;
  }
}
