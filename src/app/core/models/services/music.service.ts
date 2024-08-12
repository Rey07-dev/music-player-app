import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, tap } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Album, AlbumList } from "../interfaces/music/album";
import { Track, Tracks } from "../interfaces/music/tracks";

@Injectable({
  providedIn: "root",
})
export class MusicService {
  private API_URL = environment.apiBaseUrl;
  private API_KEY = environment.apiKey;
  private favorites: string[] = [];
  private playlists: { [key: string]: string[] } = {};
  constructor(private http: HttpClient) {}

  getAlbums(artistId: string | undefined) {
    return this.http.get<AlbumList>(`${this.API_URL}/${this.API_KEY}/album.php?i=${artistId}`);
  }

  getTracks(albumId: string | undefined): Observable<Tracks> {
    return this.http.get<Tracks>(`${this.API_URL}/${this.API_KEY}/track.php?m=${albumId}`)
  }


  getPlaylists(): Observable<any> {
    return this.http.get(`${this.API_URL}playlist.php?u=1`);
  }

  getArtists(artistId: string | undefined): Observable<any> {
    return this.http.get(`${this.API_URL}artist.php?i=${artistId}`);
  }
  // getNewReleases(): Observable<any> {
  //   return this.http.get(`${this.API_URL}searchalbum.php?s=latest`);
  // }

  // getGenres(): Observable<any> {
  //   return this.http.get(`${this.API_URL}genre.php`);
  // }

  getTrending(): Observable<any> {
    console.log("music service", this.API_URL);
    // www.theaudiodb.com/api/v1/json/2/trending.php?country=us&type=itunes&format=albums
    return this.http.get(
      `${this.API_URL}/${this.API_KEY}/trending.php?country=us&type=itunes&format=albums`
    );
  }

  addToFavorites(trackId: string): Observable<any> {
    if (!this.favorites.includes(trackId)) {
      this.favorites.push(trackId);
    }
    return of(this.favorites);
  }

  addToPlaylist(trackId: string, playlistId: string): Observable<any> {
    if (!this.playlists[playlistId]) {
      this.playlists[playlistId] = [];
    }
    if (!this.playlists[playlistId].includes(trackId)) {
      this.playlists[playlistId].push(trackId);
    }
    return of(this.playlists);
  }
}
