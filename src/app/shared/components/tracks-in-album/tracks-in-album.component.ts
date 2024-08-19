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

  constructor(private spotifyService: SpotifyPlayerService){}

  ngOnInit(): void {
    setInterval(() => {
      this.getAndPlay();
    }, 2000);
  }

  getAndPlay(){
    this.album = localStorage.getItem("album")
      ? JSON.parse(localStorage.getItem("album")!)
      : null;
    this.tracks = localStorage.getItem("player_state")
      ? JSON.parse(localStorage.getItem("player_state")!)
      : null;
    this.album.images.forEach((img: any) => {
      img.height >= 500 ? this.albumImg = img.url : this.albumImg = img.url;
    });
    this.currentPlay = this.tracks.track_window.current_track;
    this.tracks.track_window.next_tracks.forEach((track: any) => {
      this.nextPlay?.push(track);
    });
    this.currentPlay.album.images.forEach((img: any) => {
      img.height >= 60 ? this.playImg = img.url : this.playImg = img.url;
    })
  }

  showPlayButton = false;

  playSong(song: TrackInfo) {
    this.spotifyService.play(song?.album.uri);
  }

  getArtistNames(name: any) {
    return name?.artists[0].name;
  }
  duration(duration: any) {
    duration = Math.round(duration?.duration_ms / 1000);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    return formattedTime;
  }
}
