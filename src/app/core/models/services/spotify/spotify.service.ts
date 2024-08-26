import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { SpotifyAlbums } from '../../interfaces/spotify';
import { ArtistsResponse } from '../../interfaces/user/artist';
import { SpotifyGenreData } from '../../interfaces/genre';
import { Playlist } from '../../interfaces/playlist';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private url = 'https://spotify117.p.rapidapi.com/new_releases/?country=us';
  private trackApiUrl = 'https://spotify23.p.rapidapi.com/tracks';
  private albumTracksUrl = 'https://spotify23.p.rapidapi.com/album_tracks'
  private singleArtistUrl = 'https://spotify23.p.rapidapi.com/artists'
  private genreUrl = 'https://spotify23.p.rapidapi.com/genre_view'
  private playlistUrl = 'https://spotify23.p.rapidapi.com/playlist'


  private headers = new HttpHeaders({
    'x-rapidapi-key': environment.apiKey,
    'x-rapidapi-host': 'spotify23.p.rapidapi.com',
  });

  private jsonURL = 'assets/spotiData.json';
  private singleArtist = 'assets/singleArtist.json'
  private tracks = 'assets/tracks.json'
  private genre = 'assets/genre.json'
  private playlist = 'assets/playlist.json'

  constructor(private http: HttpClient) {}

  getNewReleases() {
    // return this.http.get<SpotifyAlbums>(this.url, { headers: this.headers });
    return this.http.get<SpotifyAlbums>(this.jsonURL);
  }

  getAlbumTracks(id: string) {
    const url = `${this.albumTracksUrl}/?id=${id}&offset=0&limit=300`;
    return this.http.get(url, { headers: this.headers });
  }

  getSingleArtist(id: string) {
    const url = `${this.singleArtistUrl}/?ids=${id}`;
    return this.http.get<ArtistsResponse>(url, { headers: this.headers })
  }

  getPlaylist() {
    // const url = `${this.playlistUrl}/?ids=${id}`;
    // return this.http.get(url, { headers: this.headers });
    return this.http.get<Playlist>(this.playlist);
  }

  getGenre() {
    // const url = `${this.genreUrl}/?id=${id}&content_limit=10&limit=20`;
    // return this.http.get(url, { headers: this.headers });
    return this.http.get<SpotifyGenreData>(this.genre);
  }
  getTrack() {
    // id: string | string[], market?: string
    // const url = `${this.trackApiUrl}/?ids=${id}`;
    // return this.http.get<SpotifyAlbums>(url, { headers: this.headers });
    return this.http.get(this.tracks);
  }



}
