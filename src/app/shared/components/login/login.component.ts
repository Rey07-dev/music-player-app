import { Component } from '@angular/core';
import { SpotifyAuthService } from '../../../core/models/services/spotify/spotify-auth.service';

@Component({
  selector: 'app-spotify-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class SpotifyLoginComponent {
  constructor(private spotifyAuthService: SpotifyAuthService) {}

  login() {
    this.spotifyAuthService.login();
  }
}
