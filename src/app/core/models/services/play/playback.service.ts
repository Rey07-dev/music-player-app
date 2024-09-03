import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { SpotifyPlayerService } from "../spotify/spotify-player.service";
import { SpotifyPlaylist } from "../../interfaces/genre";

@Injectable({
  providedIn: "root",
})
export class PlaybackService {
  private currentIndexSubject = new BehaviorSubject<number>(-1);
  audio = new Audio();

  currentIndex$ = this.currentIndexSubject.asObservable();
  playbackPosition$ = new BehaviorSubject<number>(0);

  constructor(private spotifyService: SpotifyPlayerService,) { }


  playPlaylist(playlist: SpotifyPlaylist) {
    this.spotifyService.play(playlist.uri);
    if (localStorage.getItem('device_id')) {
      localStorage.setItem("album", JSON.stringify(playlist));
    }
  }

}
