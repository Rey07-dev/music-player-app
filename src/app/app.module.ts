import { NgModule, isDevMode } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { HomeComponent } from "./pages/home/home.component";
import { AppComponent } from "./app.component";
import { RouterOutlet } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { MatButtonModule } from "@angular/material/button";
import { themeReducer } from "./store/theme/theme.reducer";
import { SharedModule } from "./shared/shared.module";
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from "@angular/common/http";
import { AlbumsComponent } from "./pages/albums/albums.component";
import { PlaylistsComponent } from "./pages/playlists/playlists.component";
import { ArtistsComponent } from "./pages/artists/artists.component";
import { TrendingComponent } from "./pages/trending/trending.component";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AlbumEffects } from "./store/musicAlbum/album.effects";
import { EffectsModule } from "@ngrx/effects";
import { albumReducer } from "./store/musicAlbum/album.reducer";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe, CommonModule } from "@angular/common";
import { playMusicReducer } from "./store/play-track/playMusic.reducer";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { PlayMusicEffects } from "./store/play-track/playMusic.effects";
import { spotifyReducer } from "./store/spotify/spotify.reducer";
import { spotifyAuthInterceptor } from "./core/interceptors/spotify_auth.interceptor";
import { spotifyPlayerInterceptor } from "./core/interceptors/spotify.interceptor";
import { GenreComponent } from './pages/genre/genre.component';
import { authInterceptor } from "./core/interceptors/auth/auth.interceptor";
import { ToastComponent } from "./shared/components/toast/toast.component";
import { addHeader } from "./core/interceptors/auth/header.interceptor";


const reducers = {
  theme: themeReducer,
  albums: albumReducer,
  music: playMusicReducer,
  spotifyReducer,
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumsComponent,
    PlaylistsComponent,
    ArtistsComponent,
    TrendingComponent,
    GenreComponent,
    ToastComponent
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
    EffectsModule.forRoot([AlbumEffects, PlayMusicEffects]),
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
        addHeader,
        authInterceptor,
        spotifyAuthInterceptor,
        spotifyPlayerInterceptor,
      ])
    ),
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
