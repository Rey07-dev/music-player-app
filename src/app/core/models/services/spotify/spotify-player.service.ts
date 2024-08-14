import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SpotifyState } from '../../../../store/spotify/spotify.reducer';

// declare global {
//   interface Window {
//     onSpotifyWebPlaybackSDKReady: () => void;
//     Spotify: any;
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class SpotifyPlayerService {

  player: any;

  // constructor(private store: Store<{ spotify: SpotifyState }>) {
  //   this.store.select('spotify').subscribe((state) => {
  //     if (state.token) {
  //       this.initializePlayer(state.token);
  //     }
  //   });
  // }

  // initializePlayer(token: string) {
  //   window.onSpotifyWebPlaybackSDKReady = () => {
  //     this.player = new window.Spotify.Player({
  //       name: 'Angular Spotify Player',
  //       getOAuthToken: (cb: any) => {
  //         cb(token);
  //       },
  //       volume: 0.5,
  //     });

  //     this.player.connect();
  //   };

  //   if (!window.Spotify) {
  //     const script = document.createElement('script');
  //     script.src = 'https://sdk.scdn.co/spotify-player.js';
  //     document.body.appendChild(script);
  //   }
  // }

  // play(uri: string) {
  //   console.log(uri,localStorage.getItem('spotifyToken'));
  //   fetch(`https://api.spotify.com/v1/me/player/play`, {
  //     method: 'PUT',
  //     body: JSON.stringify({ uris: [uri] }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${localStorage.getItem('spotifyToken')}`,
  //     },
  //   });
  // }
}
