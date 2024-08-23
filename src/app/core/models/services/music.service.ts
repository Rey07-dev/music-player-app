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
  private API_KEY = environment.apiKey;
  private favorites: string[] = [];
  private playlists: { [key: string]: string[] } = {};
  constructor(private http: HttpClient) {}


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
