import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class MusicService {
  private API_KEY = environment.apiKey;
  private favorites: string[] = [];
  private playlists: { [key: string]: string[] } = {};
  constructor(private http: HttpClient) {}


  addToPlaylist(trackId: string, playlistId: string): Observable<unknown> {
    if (!this.playlists[playlistId]) {
      this.playlists[playlistId] = [];
    }
    if (!this.playlists[playlistId].includes(trackId)) {
      this.playlists[playlistId].push(trackId);
    }
    return of(this.playlists);
  }
}
