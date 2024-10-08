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
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { AlbumsComponent } from "./pages/albums/albums.component";
import { PlaylistsComponent } from "./pages/playlists/playlists.component";
import { ArtistsComponent } from "./pages/artists/artists.component";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe, CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { spotifyReducer } from "./store/spotify/spotify.reducer";
import { spotifyAuthInterceptor } from "./core/interceptors/spotify_auth.interceptor";
import { spotifyPlayerInterceptor } from "./core/interceptors/spotify.interceptor";
import { GenreComponent } from './pages/genre/genre.component';
import { authInterceptor } from "./core/interceptors/auth/auth.interceptor";
import { ToastComponent } from "./shared/components/toast/toast.component";
import { addHeader } from "./core/interceptors/auth/header.interceptor";


const reducers = {
  theme: themeReducer,
  spotifyReducer,
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumsComponent,
    PlaylistsComponent,
    ArtistsComponent,
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
    AsyncPipe,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(),
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
      ]),
      withInterceptorsFromDi()
    ),
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
