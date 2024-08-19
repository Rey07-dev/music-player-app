import { SpotifyPlayerService } from './../../core/models/services/spotify/spotify-player.service';
import { Component } from '@angular/core';
import { SpotifyService } from '../../core/models/services/spotify/spotify.service';
import { SpotifyGenreData } from '../../core/models/interfaces/genre';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css'
})
export class GenreComponent {
  genreData!: SpotifyGenreData;

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
    localStorage.removeItem('player_state')
  }
  playPlaylist(playlist: any) {
    console.log('playlist', playlist)
    localStorage.setItem('album', JSON.stringify(playlist))
    this.spotifyPlayerService.play(playlist.uri);
  }
}
