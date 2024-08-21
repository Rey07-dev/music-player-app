import { Component } from '@angular/core';
import { SpotifyService } from '../../core/models/services/spotify/spotify.service';
import { Playlist, Track, TrackItem } from '../../core/models/interfaces/playlist';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.css'
})
export class PlaylistsComponent {
  playlists!: Playlist;
  playlistImg!: string;
  followers!: number;
  tracks!: TrackItem[];

  constructor( private spotifyService: SpotifyService) { }

  ngOnInit(): void {

    this.spotifyService.getPlaylist().subscribe({
      next: (data) => {
        if (data) {
          this.playlists = data;
          this.playlistImg = data?.images[0]?.url;
          this.followers =  data?.followers?.total
          this.tracks = data.tracks.items
        }
      },
      error: (err) => {
        console.error('Error fetching playlists', err);
      }
    });
  }
}
