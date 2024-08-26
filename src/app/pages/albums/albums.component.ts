import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Album } from '../../core/models/interfaces/music/album';
import { SpotifyService } from '../../core/models/services/spotify/spotify.service';
import { IAlbumItem } from '../../core/models/interfaces/spotify';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent {
  albumData: Album[] = [];
  tracks!: IAlbumItem[];

  constructor(private store: Store,private spotifyService: SpotifyService) {}
  ngOnInit(): void {

    this.spotifyService.getNewReleases().subscribe({
      next: (data) => {
        if (data) {
          this.tracks = data.albums.items;
        }
      },
    });
  }
}
