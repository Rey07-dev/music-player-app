import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Track, Tracks } from '../../core/models/interfaces/music/tracks';
import { MusicService } from '../../core/models/services/music.service';
import { AlbumState } from '../../store/musicAlbum/album.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // songs: Top50Songs[] = this.songsService.getTopSongs();
  tracks!: Track[];


  constructor(private store: Store<{ albums: AlbumState }>,
    // private songsService: TopSongsService,
    private musicService: MusicService
  ) {
  }

  ngOnInit(): void {
    this.musicService.getTracks('2115886').subscribe((tracks: Tracks) => {
      console.log(tracks);
      this.tracks = tracks.track;
    });
  }

}
