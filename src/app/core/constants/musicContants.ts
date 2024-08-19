import { MusicList } from '../models/interfaces/music/types';

export const musicList: MusicList[] = [
  {
    name: 'Home',
    icon: 'fas fa-user-astronaut',
    link: '',
    label: 'Home',
  },
  // {
  //   name: 'Trending',
  //   label: 'Trending',
  //   icon: 'fas fa-fire',
  //   link: '/trending',
  // },
  // {
  //   name: 'New',
  //   icon: 'fas fa-music',
  //   link: '/new-releases',
  //   label: 'New Releases',
  //   isActive: false
  // },
  {
    name: 'Artists',
    icon: 'fas fa-user-md',
    link: '/artists',
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
  // {
  //   name: 'Favorites',
  //   icon: 'fas fa-heart',
  //   link: '/favorites',
  //   label: 'Favorites',
  // },
  {
    name: 'My Playlists',
    icon: 'fas fa-list',
    link: '/playlists',
    label: 'My Playlist',
  },
];
