import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from "./../../../core/models/services/spotify/spotify.service";
import { Component } from "@angular/core";
import { SimplifiedTrackObject } from "../../../core/models/interfaces/search";
import { ITrack, ITrackInfo } from "../../../core/models/interfaces/tracks";

@Component({
  selector: "app-tracks",
  templateUrl: "./tracks.component.html",
  styleUrl: "./tracks.component.css",
})
export class TracksComponent {
  track!: ITrackInfo;
  spotifyEmbedUrl: any;

  constructor(
    private spotifyService: SpotifyService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params["id"];
      this.spotifyService.getTrack(id).subscribe({
        next: (data) => {
          console.log('data', data);
          this.track = data.tracks[0];
          this.spotifyEmbedUrl = data.tracks[0].external_urls.spotify;
        },
      });
    })

    // this.spotifyService.getTrack().subscribe({
    //   next: (data) => {
    //     this.track = data.tracks[0];
    //     console.log("data", data);
    //   },
    // });
  }
}
