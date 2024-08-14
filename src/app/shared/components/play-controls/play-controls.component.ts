import { Component, ElementRef, ViewChild } from "@angular/core";
import { PlaybackService } from "../../../core/models/services/play/playback.service";
import { Store } from "@ngrx/store";
import {
  nextTrack,
  pauseTrack,
  playTrack,
  previousTrack,
  trackEnded,
} from "../../../store/play-track/playMusic.actions";
import {
  selectCurrentTrack,
  selectIsPlaying,
} from "../../../store/play-track/playMusic.selectors";
import { Observable } from "rxjs";
import { SpotifyTrack } from "../../../core/models/interfaces/spotify";

@Component({
  selector: "app-play-controls",
  templateUrl: "./play-controls.component.html",
  styleUrl: "./play-controls.component.css",
})
export class PlayControlsComponent {
  @ViewChild("audioPlayer", { static: true })
  audioPlayerRef!: ElementRef<HTMLAudioElement>;
  trackDetails = this.store.selectSignal(selectCurrentTrack);

  // trackDetails$: Observable<any>  = this.store.select(selectCurrentTrack)
  // isPlaying = this.store.selectSignal(selectIsPlaying);
  audio: HTMLAudioElement = new Audio();
  currentTrackArtist: string | undefined = "";
  isPlayingMusic: boolean = false;
  isPlaying$ = this.store.select(selectIsPlaying);

  constructor(private playbackService: PlaybackService, private store: Store) {
    //   this.trackDetails$
    //   this.isPlaying$ = this.store.select(selectIsPlaying);
  }

  ngOnInit(): void {
    // this.trackDetails$.subscribe(track => {
    //   console.log(track, "track in play-controls");
    //   if (track) {
    //     this.currentTrack = track;
    //     this.playbackService.playTrack(track, track);
    //   }
    // });
    // this.isPlaying$.subscribe((isPlaying) => {
    //   this.currentTrackArtist = this.trackDetails()?.artists[0].name;
    //   console.log(isPlaying, "isPlaying", this.trackDetails()?.artists[0].name);
    //   if (isPlaying) {
    //     this.audio.play();
    //     this.isPlayingMusic = true;
    //   } else {
    //     this.audio.pause();
    //     this.isPlayingMusic = false;
    //   }
    // });
    const spotifyData: SpotifyTrack[] = [];
    this.playbackService.setPlaylist(spotifyData);

    this.isPlaying$.subscribe((isPlaying) => {
      if (isPlaying) {
        this.playbackService.audio.play();
      } else {
        this.playbackService.audio.pause();
      }
    });

    this.playbackService.audio.addEventListener("ended", () => {
      this.store.dispatch(nextTrack());
    });
  }

  play(): void {
    this.store.dispatch(playTrack());
  }

  pause(): void {
    this.store.dispatch(pauseTrack());
    this.playbackService.pauseTrack();
  }

  next(): void {
    // console.log("next");
    this.store.dispatch(nextTrack());
  }

  previous(): void {
    console.log("previous");
    this.store.dispatch(previousTrack());
  }

  stop(): void {
    this.playbackService.audio.pause();
    this.playbackService.audio.currentTime = 0;
    this.store.dispatch(trackEnded());
  }

  seek(event: any): void {
    const seekTime = (event.target.value / 100) * this.playbackService.audio.duration;
    this.playbackService.seek(seekTime);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  onKeyPress(event: KeyboardEvent): void {}

  onKeyDown(event: KeyboardEvent): void {}

  onKeyUp(event: KeyboardEvent): void {}
}
