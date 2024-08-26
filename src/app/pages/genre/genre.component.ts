import { SpotifyPlayerService } from './../../core/models/services/spotify/spotify-player.service';
import { Component } from '@angular/core';
import { SpotifyService } from '../../core/models/services/spotify/spotify.service';
import { SpotifyGenreData, SpotifyPlaylist } from '../../core/models/interfaces/genre';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css'
})
export class GenreComponent {
  genreData!: SpotifyGenreData;
  placeholder = 'astro.png';

  constructor(private spotifyService: SpotifyService, private spotifyPlayerService: SpotifyPlayerService) { }

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
    localStorage.setItem('album', JSON.stringify(playlist))
    this.spotifyPlayerService.play(playlist.uri);
  }
}
