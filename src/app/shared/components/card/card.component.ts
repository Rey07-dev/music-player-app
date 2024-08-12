import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Track } from '../../../core/models/interfaces/music/tracks';
import { PlaybackService } from '../../../core/models/services/play/playback.service';
import { selectTrack } from '../../../store/play-track/playMusic.actions';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({ required: true }) songs!: Track;
  placeholder: string = "astro.png";
  showPlayButton = false;

  constructor(private playbackService: PlaybackService, private store: Store) {}

  playSong(song: Track) {
    // console.log(song);
    // this.playbackService.getTrackInfo(song);
    // this.playbackService.playTrack(parseInt(song.intDuration), song)
    this.store.dispatch(selectTrack({ track: song }));
  }
}
