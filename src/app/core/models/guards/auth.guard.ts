import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SpotifyAuthService } from '../services/spotify/spotify-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private spotifyAuthService: SpotifyAuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.spotifyAuthService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/spotify-login']);
      return false;
    }
  }
}
