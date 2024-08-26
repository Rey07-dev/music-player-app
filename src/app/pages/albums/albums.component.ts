import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AlbumState } from '../../store/musicAlbum/album.state';
import * as albumSelectors from '../../store/musicAlbum/album.selectors';
import * as albumActions from '../../store/musicAlbum/album.actions';
import { Album } from '../../core/models/interfaces/music/album';
import { SpotifyService } from '../../core/models/services/spotify/spotify.service';
import { IAlbumItem } from '../../core/models/interfaces/spotify';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent {
  albums = this.store.selectSignal(albumSelectors.selectAlbums);
  loading = this.store.selectSignal(albumSelectors.selectAlbumsLoading);
  error = this.store.selectSignal(albumSelectors.selectAlbumsError);
  albumData: Album[] = [];
  tracks!: IAlbumItem[];

  constructor(private store: Store<{ albums: AlbumState }>,private spotifyService: SpotifyService) {}
  ngOnInit(): void {
    if(!this.albums()?.length) {
      this.store.dispatch(albumActions.albumRequestStart());
    }

    this.spotifyService.getNewReleases().subscribe({
      next: (data) => {
        if (data) {
          this.tracks = data.albums.items;
        }
      },
    });
  }
}
