import { Component, ElementRef, ViewChild } from "@angular/core";
import { SpotifyPlayerService } from "../../../core/models/services/spotify/spotify-player.service";
import { PlayingSongState } from "../../../core/models/interfaces/spotify";
import { interval, Subscription, switchMap } from "rxjs";

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
  currentTime: number = 0;
  duration: number = 0;
  private pollSubscription!: Subscription;

  constructor(private spotifyPlayerService: SpotifyPlayerService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.spotifyPlayerService.initializePlayer();
    },2000)
    this.updateTrackInfo();

    this.pollSubscription = interval(1000).pipe(
      switchMap(() => this.spotifyPlayerService.getCurrentlyPlayingTrack())
    ).subscribe(trackDetails => {
      if (trackDetails) {
        this.currentTime = trackDetails.currentTime;
        this.duration = trackDetails.duration;
      }
    });
  }

  ngOnDestroy(): void {
    this.pollSubscription.unsubscribe();
  }

  updateTrackInfo() {
    setInterval(() => {
      this.trackDetail = this.trackInfo();
      this.playImage =
      this.trackDetail?.track_window.current_track.album.images[2].url || "";
      this.artistName =
      this.trackDetail?.track_window.current_track.artists[0].name;
    }, 100);
  }


  trackInfo() {
    const playerState = localStorage.getItem("player_state");
    return playerState ? JSON.parse(playerState) : null;
  }

  play() {
    const playlistUris: PlayingSongState = localStorage.getItem("player_state")
      ? JSON.parse(localStorage.getItem("player_state")!)
      : null;
    this.spotifyPlayerService.play(
      playlistUris.track_window.current_track.album.uri
    );
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

  seek(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTime = parseFloat(input.value);
    this.spotifyPlayerService.seekToPosition(newTime);
  }

  onKeyPress(): void {}

  onKeyDown(): void {}

  onKeyUp(): void {}
}
