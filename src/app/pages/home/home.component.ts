import { Component } from "@angular/core";
import { SpotifyPlayerService } from "../../core/models/services/spotify/spotify-player.service";
import { SpotifyService } from "../../core/models/services/spotify/spotify.service";
import { IAlbumItem } from "../../core/models/interfaces/spotify";
import { SpotifyGenreData } from "../../core/models/interfaces/genre";
import { Router } from "@angular/router";
import { ToastService } from "../../core/models/services/toast/toast.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  tracks!: IAlbumItem[];
  genreData!: SpotifyGenreData;

  constructor(
    private spotifyPlayerService: SpotifyPlayerService,
    private spotifyService: SpotifyService,
    private route: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getNewReleasesAlbum();
    this.getGenres();
  }

  getNewReleasesAlbum() {
    this.spotifyService.getNewReleases().subscribe({
      next: (data) => {
        if (data) {
          this.tracks = data.albums.items;
        }
      },
      error(err) {
        console.error(err);
      },
    });

  }

  getGenres(){
    this.spotifyService.getGenre().subscribe({
      next: (data) => {
        this.genreData = data;
      },
      error: (err) => {
        this.toastService.showToast(
          "Error fetching genre data",
          "error",
        )
      },
    });
  }

  playPlaylist(playlist: any) {
    localStorage.setItem("album", JSON.stringify(playlist));
    this.spotifyPlayerService.play(playlist.uri);
  }

  goToGenres() {
    this.route.navigate(['/genres'])
  }

  goToAlbums() {
    this.route.navigate(['/albums'])
  }
}
