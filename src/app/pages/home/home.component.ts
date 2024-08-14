import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Track, Tracks } from "../../core/models/interfaces/music/tracks";
import { MusicService } from "../../core/models/services/music.service";
import { AlbumState } from "../../store/musicAlbum/album.state";
import { SpotifyPlayerService } from "../../core/models/services/spotify/spotify-player.service";
import { SpotifyService } from "../../core/models/services/spotify/spotify.service";
import { SpotifyTrack } from "../../core/models/interfaces/spotify";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  tracks!: SpotifyTrack[];

  constructor(
    private store: Store<{ albums: AlbumState }>,
    private musicService: MusicService,
    private spotifyPlayerService: SpotifyPlayerService,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    this.spotifyService.getNewReleases().subscribe({
      next: (data: any) => {
        if (data && data.albums) {
          // console.log("albums", data);
          this.tracks = data.albums.items;
        }
      }, error(err) {
        console.log(err)
      },
    })
    // this.spotifyService.getTrack().subscribe((data: any) => {
    //   console.log('track', data)
    // })
    // this.musicService.getTracks("2115886").subscribe((tracks: Tracks) => {
    //   console.log(tracks);
    //   this.tracks = tracks.track;
    // });
  }


  playTrack(id: string) {
    // const trackUri = 'spotify:track:3n3Ppam7vgaVa1iaRUc9Lp';
    const trackUri = this.tracks.filter((track) => track.id === id)[0].uri;
    console.log('trackUri', trackUri)
    // this.spotifyPlayerService.play(trackUri);
  }

  pauseTrack() {
    this.spotifyPlayerService.player.pause();
  }
}
