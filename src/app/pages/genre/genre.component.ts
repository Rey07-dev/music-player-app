import { Component } from '@angular/core';
import { SpotifyService } from '../../core/models/services/spotify/spotify.service';
import { SpotifyGenreData, SpotifyPlaylist } from '../../core/models/interfaces/genre';
import { PlaybackService } from '../../core/models/services/play/playback.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css'
})
export class GenreComponent {
  genreData!: SpotifyGenreData;
  placeholder = 'astro.png';

  constructor(private spotifyService: SpotifyService, private playbackService: PlaybackService) { }

  ngOnInit(): void {
    this.spotifyService.getGenre().subscribe({
      next: (data) => {
        this.genreData = data;
      },
      error: (err) => {
        console.error('Error fetching genre data', err);
      }
    })
  }
  playPlaylist(playlist: SpotifyPlaylist) {
    this.playbackService.playPlaylist(playlist)
  }
}
