import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { SpotifyAlbums } from '../../interfaces/spotify';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private url = 'https://spotify117.p.rapidapi.com/new_releases/?country=us';
  private tracksURL = 'https://spotify117.p.rapidapi.com/spotify_single_track/?url=https%3A%2F%2Fopen.spotify.com%2Ftrack%2F1Ef0TmgS1QrVO6tKHrMMmH'
  private headers = new HttpHeaders({
    'x-rapidapi-key': environment.apiKey,
    'x-rapidapi-host': 'spotify117.p.rapidapi.com',
  });

  private jsonURL = 'assets/spotiData.json';

  constructor(private http: HttpClient) {}

  getNewReleases(): Observable<any> {
    // return this.http.get(this.url, { headers: this.headers });
    return this.http.get<SpotifyAlbums>(this.jsonURL);
  }

  getTrack() {

    // return this.http.get<SpotifyAlbums>(this.tracksURL, { headers: this.headers });
  }

  // getAlbums(): Observable<any> {
  //   return this.http.get<any>(`${environment.apiBaseUrl}album.php?u=1`, { headers: this.headers });
  // }
}
