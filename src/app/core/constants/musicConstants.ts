import { environment } from '../../../environments/environment.development';
import { MusicList } from '../models/interfaces/music/types';

export const musicList: MusicList[] = [
  {
    name: 'Home',
    icon: 'fas fa-user-astronaut',
    link: '',
    label: 'Home',
  },
  {
    name: 'Artists',
    icon: 'fas fa-user-md',
    link: `/artist/${environment.defaultArtistId}`,
    label: 'Artists',
  },
  {
    name: 'Albums',
    icon: 'fa fa-heart-music-camera-bolt',
    link: '/albums',
    label: 'Albums',
  },
  {
    name: 'Genres',
    icon: 'fas fa-compact-disc',
    link: '/genres',
    label: ' Genres',
  },
];

export const libraryList: MusicList[] = [
  {
    name: 'My Playlists',
    icon: 'fas fa-list',
    link: '/playlists',
    label: 'My Playlist',
  },
];
