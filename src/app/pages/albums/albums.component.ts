import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AlbumState } from '../../store/musicAlbum/album.state';
import * as albumSelectors from '../../store/musicAlbum/album.selectors';
import * as albumActions from '../../store/musicAlbum/album.actions';
import { Album } from '../../core/models/interfaces/music/album';

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

  constructor(private store: Store<{ albums: AlbumState }>) {}
  ngOnInit(): void {
    if(!this.albums()?.length) {
      this.store.dispatch(albumActions.albumRequestStart());
    }
  }
}
