import { Component, Input } from '@angular/core';
import { MusicList } from '../../../core/models/interfaces/music/types';

@Component({
  selector: 'app-music-menu',
  templateUrl: './music-menu.component.html',
  styleUrl: './music-menu.component.css',
})
export class MusicMenuComponent {
  @Input({ required: true }) musicList: MusicList[] = [];
  @Input({ required: true }) title!: string;
}
