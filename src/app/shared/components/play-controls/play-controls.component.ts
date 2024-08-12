import {  Component,  ElementRef,  ViewChild,} from "@angular/core";
import { PlaybackService } from "../../../core/models/services/play/playback.service";
import { Store } from "@ngrx/store";
import {  nextTrack,  pauseTrack,  playTrack,  previousTrack,  trackEnded,} from "../../../store/play-track/playMusic.actions";
import { selectCurrentTrack } from "../../../store/play-track/playMusic.selectors";

@Component({
  selector: "app-play-controls",
  templateUrl: "./play-controls.component.html",
  styleUrl: "./play-controls.component.css",
})
export class PlayControlsComponent {
  @ViewChild("audioPlayer") audioPlayerRef!: ElementRef<HTMLAudioElement>;
  trackDetails = this.store.selectSignal(selectCurrentTrack);

  audio = new Audio();
  isPlaying: any;
  constructor(private playbackService: PlaybackService, private store: Store) {}

  ngOnInit(): void {
    console.log(this.trackDetails());
  }


  play(): void {
    console.log(this.store.dispatch(playTrack()));
    this.store.dispatch(playTrack());
  }

  pause(): void {
    this.store.dispatch(pauseTrack());
  }

  next(): void {
    this.store.dispatch(nextTrack());
  }

  stop(): void {
    this.store.dispatch(trackEnded());
  }

  previous(): void {
    this.store.dispatch(previousTrack());
  }

  seek(event: any): void {
    const seekTime = (event.target.value / 100) * this.audio.duration;
    this.audio.currentTime = seekTime;
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
