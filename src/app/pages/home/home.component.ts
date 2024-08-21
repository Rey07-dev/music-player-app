import { Component } from "@angular/core";
import { SpotifyPlayerService } from "../../core/models/services/spotify/spotify-player.service";
import { SpotifyService } from "../../core/models/services/spotify/spotify.service";
import { IAlbumItem } from "../../core/models/interfaces/spotify";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  tracks!: IAlbumItem[];

  constructor(
    private spotifyPlayerService: SpotifyPlayerService,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    this.spotifyService.getNewReleases().subscribe({
      next: (data) => {
        if (data) {
          this.tracks = data.albums.items;
        }
      },
    });
  }

  pauseTrack() {
    this.spotifyPlayerService.player.pause();
  }
}
