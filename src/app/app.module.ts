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
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AlbumEffects } from './store/musicAlbum/album.effects';
import { EffectsModule } from '@ngrx/effects';
import { albumReducer } from './store/musicAlbum/album.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, CommonModule } from '@angular/common';
import { playMusicReducer } from './store/play-track/playMusic.reducer';

const reducers = {
  theme: themeReducer,
  albums: albumReducer,
  music: playMusicReducer
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    AsyncPipe,
    StoreModule.forRoot(reducers),
    StoreModule.forFeature('albums', albumReducer),
    EffectsModule.forRoot([AlbumEffects]),
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
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
