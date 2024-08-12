import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { TrendingComponent } from './pages/trending/trending.component';

export const AppRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: '/albums', component: AlbumsComponent },
  { path: '/albums/:id', component: AlbumsComponent },
  { path: '/artists', component: ArtistsComponent },
  { path: '/trending', component: TrendingComponent },
  { path: '**', redirectTo: '' }
];
