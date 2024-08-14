import { NgModule, isDevMode } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { themeReducer } from './store/theme/theme.reducer';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from './core/interceptors/api.interceptor';
import { AlbumsComponent } from './pages/albums/albums.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { PlaylistsComponent } from './pages/playlists/playlists.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { TrendingComponent } from './pages/trending/trending.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AlbumEffects } from './store/musicAlbum/album.effects';
import { EffectsModule } from '@ngrx/effects';
import { albumReducer } from './store/musicAlbum/album.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, CommonModule } from '@angular/common';
import { playMusicReducer } from './store/play-track/playMusic.reducer';
import { SpotifyEffects } from './store/spotify/spotify.effects';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { PlayMusicEffects } from './store/play-track/playMusic.effects';


const reducers = {
  theme: themeReducer,
  albums: albumReducer,
  music: playMusicReducer
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumsComponent,
    FavoritesComponent,
    PlaylistsComponent,
    ArtistsComponent,
    TrendingComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatMenuModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    AsyncPipe,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AlbumEffects, SpotifyEffects, PlayMusicEffects]),
    SharedModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        apiInterceptor,
      ])
    ),
    // provideStore(reducers),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ApiInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
