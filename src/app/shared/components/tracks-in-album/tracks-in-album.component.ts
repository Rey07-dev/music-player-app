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

  getData(key: string) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : null;
  }

  getAndPlay(){
    this.album = this.getData("album")
    this.tracks = this.getData("player_state")
    this.currentPlay = this.tracks.track_window.current_track;
    this.tracks.track_window.next_tracks.forEach((track: any) => {
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

  showPlayButton = false;

  playSong(song: TrackInfo) {
    this.spotifyService.play(song?.album.uri);
  }

  getArtistNames(name: any) {
    return name?.artists[0].name;
  }
}
