import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { TrendingComponent } from './pages/trending/trending.component';
import { SpotifyLoginComponent } from './shared/components/login/login.component';
import { CallbackComponent } from './shared/components/login/callback.component';
import { AuthGuard } from './core/models/guards/auth.guard';
import { TracksInAlbumComponent } from './shared/components/tracks-in-album/tracks-in-album.component';
import { GenreComponent } from './pages/genre/genre.component';
import { PlaylistsComponent } from './pages/playlists/playlists.component';
import { TracksComponent } from './shared/components/tracks/tracks.component';

export const AppRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'albums', component: AlbumsComponent, canActivate: [AuthGuard] },
  { path: 'track/:id', component: TracksComponent, canActivate: [AuthGuard] },
  { path: 'album/:id', component: TracksInAlbumComponent, canActivate: [AuthGuard] },
  { path: 'artist/:id', component: ArtistsComponent, canActivate: [AuthGuard] },
  { path: 'trending', component: TrendingComponent, canActivate: [AuthGuard] },
  { path: 'genres', component: GenreComponent, canActivate: [AuthGuard] },
  { path: 'playlists', component: PlaylistsComponent, canActivate: [AuthGuard] },
  { path: 'spotify-login', component: SpotifyLoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: '' },

];
