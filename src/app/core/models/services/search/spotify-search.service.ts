import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResponse } from '../../interfaces/search';
import { SpotifyAuthService } from '../spotify/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifySearchService {
  private apiUrl = environment.searchURL;


  constructor(private http: HttpClient, private spotifyAuthService: SpotifyAuthService) {}

  search(query: string, type: string[], market?: string, limit: number = 50, offset: number = 0): Observable<SearchResponse> {
    const token = localStorage.getItem("spotify_token");

    let params = new HttpParams()
      .set('q', query)
      .set('type', type.join(','))
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    if (market) {
      params = params.set('market', market);
    }

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.get<SearchResponse>(this.apiUrl, {headers, params });
  }
}
