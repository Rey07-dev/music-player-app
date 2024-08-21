import { ActivatedRoute } from '@angular/router';
import { ToastService } from "./../../core/models/services/toast/toast.service";
import { Component } from "@angular/core";
import { SpotifyService } from "../../core/models/services/spotify/spotify.service";
import { Artist } from "../../core/models/interfaces/user/artist";

@Component({
  selector: "app-artists",
  templateUrl: "./artists.component.html",
  styleUrl: "./artists.component.css",
})
export class ArtistsComponent {
  artist?: Artist;
  constructor(
    private spotifyService: SpotifyService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get("id")!;
    this.spotifyService.getSingleArtist(id).subscribe({
      next: (data) => {
        this.artist = data.artists[0];
      },
      error: (err) => {
        this.toastService.showToast("Error fetching artist", "error");
      },
    });
  }
}
