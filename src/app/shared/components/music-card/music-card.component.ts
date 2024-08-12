import { Component, Input } from '@angular/core';
import { Album } from '../../../core/models/interfaces/music/album';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrl: './music-card.component.css'
})
export class MusicCardComponent {
  @Input() musicData!: Album;
  placeholder:string = 'astro.png';
}
