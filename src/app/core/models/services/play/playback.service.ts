import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Track } from '../../interfaces/music/tracks';

@Injectable({
  providedIn: 'root'
})
export class PlaybackService {

  private currentTrackSubject = new BehaviorSubject<any>(null);
  private playlist: any[] = [];
  private currentIndex = -1;
  private playbackPosition = 0;

  currentTrack$ = this.currentTrackSubject.asObservable();
  playbackPosition$ = new BehaviorSubject<number>(0);

  setPlaylist(tracks: any[]) {
    this.playlist = tracks;
    this.currentIndex = -1; // Reset index
  }

  playTrack(index: number, info?: Track) {
    console.log(info, index)
    if (index >= 0 && index < this.playlist.length) {
      this.currentIndex = index;
      this.currentTrackSubject.next(this.playlist[index]);
      this.playbackPosition = 0;
      this.playbackPosition$.next(this.playbackPosition);
      console.log(`Playing track: ${this.playlist[index].title}`);
    }
  }

  seek(position: number) {
    if (this.currentTrackSubject.value) {
      this.playbackPosition = position;
      this.playbackPosition$.next(this.playbackPosition);
      console.log(`Seeked to position: ${position}`);
      // Implement actual seeking logic with your audio player here
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

  getTrackInfo(info: Track) {
    return info
  }
}
