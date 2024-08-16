import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { IAlbumItem } from "../../interfaces/spotify";
import { SpotifyPlayerService } from "../spotify/spotify-player.service";

@Injectable({
  providedIn: "root",
})
export class PlaybackService {
  private currentTrackSubject = new BehaviorSubject<any>(null);
  private currentIndexSubject = new BehaviorSubject<number>(-1);
  public playlist: IAlbumItem[] = [];
  audio = new Audio();

  currentTrack$ = this.currentTrackSubject.asObservable();
  currentIndex$ = this.currentIndexSubject.asObservable();
  playbackPosition$ = new BehaviorSubject<number>(0);

  constructor(private spotifyService: SpotifyPlayerService,) { }

  setPlaylist(tracks:IAlbumItem[]) {
    this.playlist = tracks;
    this.currentIndexSubject.next(-1);
  }

  playTrack(index: number) {
    const track = this.playlist[index];
    this.spotifyService.play(track?.uri);
    this.currentIndexSubject.next(index);
    this.currentTrackSubject.next(track);
  }

  pauseTrack() {
    this.spotifyService.pause();
  }


  nextTrack() {
    const currentIndex = this.currentIndexSubject.value;
    if (currentIndex < this.playlist.length - 1) {
      this.playTrack(currentIndex + 1);
    }
  }

  previousTrack() {
    const currentIndex = this.currentIndexSubject.value;
    if (currentIndex > 0) {
      this.playTrack(currentIndex - 1);
    }
  }
}
