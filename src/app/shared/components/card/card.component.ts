import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAlbumItem } from '../../../core/models/interfaces/spotify';
import { PlaybackService } from '../../../core/models/services/play/playback.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({ required: true }) songs!: IAlbumItem;
  placeholder: string = "astro.png";
  showPlayButton = false;

  constructor(private playbackService: PlaybackService, private store: Store) {}

  playSong(song: IAlbumItem) {
    this.playbackService.setPlaylist([song]);
    localStorage.setItem('select_track', JSON.stringify(song))
  }
}
