import { ToastService } from './../../../core/models/services/toast/toast.service';
import { Component } from "@angular/core";
import {
  IAlbumItem,
  PlayingSongState,
  TrackInfo,
} from "../../../core/models/interfaces/spotify";
import { SpotifyPlayerService } from "../../../core/models/services/spotify/spotify-player.service";

@Component({
  selector: "app-tracks-in-album",
  templateUrl: "./tracks-in-album.component.html",
  styleUrl: "./tracks-in-album.component.css",
})
export class TracksInAlbumComponent {
  album!: IAlbumItem;
  tracks!: PlayingSongState;
  albumImg!: string;
  currentPlay!: TrackInfo;
  playImg!: string;
  nextPlay!: TrackInfo[];
  showPlayButton = false;

  constructor(private spotifyService: SpotifyPlayerService, private toastService: ToastService){}

  ngOnInit(): void {
    setInterval(() => {
      this.getAndPlay();
    }, 2000);
  }

  getAndPlay(){
    this.album = this.toastService.getStoredData("album")
    this.tracks = this.toastService.getStoredData("player_state")
    if (this.tracks && this.album) {
      this.currentPlay = this.tracks.track_window.current_track;
      this.tracks.track_window.next_tracks.forEach((track) => {
        this.nextPlay?.push(track);
      });
      this.currentPlay.album.images.forEach((img: { height: number; url: string; width: number }) => {
        if (img.height >= 500) {
          this.albumImg = img.url;
        } else if(img.height >= 60) {
          this.playImg = img.url;
        } else {
          this.playImg = img.url
        }
      })
    }
  }

  playSong(song: TrackInfo) {
    this.spotifyService.play(song?.album.uri);
  }

  getArtistNames(name: TrackInfo) {
    return name.artists[0].name;
  }
}
