import { PlaybackService } from './../../../core/models/services/play/playback.service';
import { Component, ElementRef, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";

import { SpotifyPlayerService } from "../../../core/models/services/spotify/spotify-player.service";
import { PlayingSongState } from "../../../core/models/interfaces/spotify";

@Component({
  selector: "app-play-controls",
  templateUrl: "./play-controls.component.html",
  styleUrl: "./play-controls.component.css",
})
export class PlayControlsComponent {

  @ViewChild("audioPlayerRef") audioPlayerRef!: ElementRef<HTMLAudioElement>;
  isPlaying: boolean = false;
  trackDetail!: PlayingSongState | null;
  artistName: any;
  playImage!: string;

  constructor(
    private spotifyPlayerService: SpotifyPlayerService,
    private store: Store, private playbackService: PlaybackService
  ) {
    this.spotifyPlayerService.initializePlayer();
  }

  ngOnInit(): void {
    setInterval(() => {
      this.trackDetail = this.trackInfo();
      this.playImage = this.trackDetail?.track_window.current_track.album.images[2].url || '';
      this.artistName = this.trackDetail?.track_window.current_track.artists[0].name;
    }, 100);
  }

  trackInfo(){
    const playerState = localStorage.getItem('player_state');
    return playerState ? JSON.parse(playerState) : null;
  }

  play() {
    const playlistUris: PlayingSongState = localStorage.getItem('player_state')
     ? JSON.parse(localStorage.getItem('player_state')!)
     : null;
    this.spotifyPlayerService.play(playlistUris.track_window.current_track.album.uri);
  }

  pause() {
    this.spotifyPlayerService.pause();
  }

  next() {
    this.spotifyPlayerService.next();
  }

  previous() {
    this.trackDetail = this.trackInfo();
    this.spotifyPlayerService.previous();
  }

  onKeyPress(event: KeyboardEvent): void {}

  onKeyDown(event: KeyboardEvent): void {}

  onKeyUp(event: KeyboardEvent): void {}
}
