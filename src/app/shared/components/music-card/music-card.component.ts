import { SpotifyPlayerService } from './../../../core/models/services/spotify/spotify-player.service';
import { Component, Input } from "@angular/core";
import { IAlbumItem } from "../../../core/models/interfaces/spotify";
import { Router } from "@angular/router";

@Component({
  selector: "app-music-card",
  templateUrl: "./music-card.component.html",
  styleUrl: "./music-card.component.css",
})
export class MusicCardComponent {
  @Input() musicData!: IAlbumItem;
  placeholder: string = "astro.png";

  constructor(
    private route: Router,
    private spotifyPlayerService: SpotifyPlayerService,
  ) {}

  openAlbum(album: IAlbumItem) {
    this.spotifyPlayerService.play(album.uri);
    if (localStorage.getItem("device_id")) {
      this.route.navigate(["/album/", album.id]);
      localStorage.setItem("album", JSON.stringify(album));
    }
  }
}
