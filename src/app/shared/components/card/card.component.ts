import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlaybackService } from '../../../core/models/services/play/playback.service';
import { selectTrack } from '../../../store/play-track/playMusic.actions';
import { IAlbumItem } from '../../../core/models/interfaces/spotify';

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

  playSong(song: any) {
    this.playbackService.setPlaylist([song]);
    this.store.dispatch(selectTrack({ track: song }));
    localStorage.setItem('select_track', JSON.stringify(song))
  }
}
