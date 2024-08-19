import { Component } from '@angular/core';
import { SpotifyService } from '../../core/models/services/spotify/spotify.service';
import { Artist } from '../../core/models/interfaces/user/artist';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css'
})
export class ArtistsComponent {
  artist?: Artist;
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.spotifyService.getSingleArtist().subscribe({
      next: (data) => {
        this.artist = data.artists[0]
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
