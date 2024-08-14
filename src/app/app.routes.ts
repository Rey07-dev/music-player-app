import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { TrendingComponent } from './pages/trending/trending.component';
import { LoginComponent } from './shared/components/login/login.component';
import { CallbackComponent } from './shared/components/login/callback.component';
import { AuthGuard } from './core/models/guards/auth.guard';

export const AppRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'albums', component: AlbumsComponent, canActivate: [AuthGuard] },
  { path: 'artists', component: ArtistsComponent, canActivate: [AuthGuard] },
  { path: 'trending', component: TrendingComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: '' },

];
