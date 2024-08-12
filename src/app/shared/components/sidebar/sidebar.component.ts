import { MusicList } from '../../../core/models/interfaces/music/types';
import { musicList, libraryList } from './../../../core/constants/musicContants';
import { Component } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
 musicList: MusicList[] = musicList
 libraryList: MusicList[] = libraryList
}
