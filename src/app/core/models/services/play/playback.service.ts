import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Track } from "../../interfaces/music/tracks";
import { SpotifyTrack } from "../../interfaces/spotify";

@Injectable({
  providedIn: "root",
})
export class PlaybackService {
  private currentTrackSubject = new BehaviorSubject<any>(null);
  public playlist: any[] = [];
  public currentIndex = -1;
  private playbackPosition = 0;
  audio = new Audio();

  currentTrack$ = this.currentTrackSubject.asObservable();
  playbackPosition$ = new BehaviorSubject<number>(0);

  setPlaylist(tracks: SpotifyTrack[]) {
    this.playlist = tracks;
    this.currentIndex = -1;
  }

  playTrack(index: number) {
    const track = this.playlist[index];
    const audio = this.audio;
    audio.src = track.external_urls.spotify;

    audio.oncanplay = () => {
      audio
        .play()
        .catch((error) => console.error("Error playing track:", error));
    };
    audio.load();
    // console.log(index, 'index');
    if (index >= 0 && index < this.playlist.length) {
      this.currentIndex = index;
      const track = this.playlist[index];
      this.currentTrackSubject.next(track);
      this.audio.src = track.external_urls.spotify;
      this.audio.play();
      this.playbackPosition = 0;
      this.playbackPosition$.next(this.playbackPosition);
      console.log(`Playing track: ${track.name}`);
    }
  }

  pauseTrack() {
    if (this.currentTrackSubject.value) {
      console.log(`Pausing track: ${this.currentTrackSubject.value.name}`);
      this.audio.pause();
    }
  }

  seek(position: number) {
    if (this.currentTrackSubject.value) {
      this.playbackPosition = position;
      this.playbackPosition$.next(this.playbackPosition);
      this.audio.currentTime = position;
      console.log(`Seeked to position: ${position}`);
    }
  }

  nextTrack() {
    if (this.currentIndex < this.playlist.length - 1) {
      this.playTrack(this.currentIndex + 1);
    }
  }

  previousTrack() {
    if (this.currentIndex > 0) {
      this.playTrack(this.currentIndex - 1);
    }
  }

  trackFinished() {
    this.nextTrack();
  }
}
