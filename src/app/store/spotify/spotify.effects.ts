import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { authenticate, authenticateSuccess, authenticateFailure } from './spotify.actions';
import { environment } from '../../../environments/environment';

@Injectable()
export class SpotifyEffects {
  constructor(private actions$: Actions, private router: Router) {}

  authenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticate),
      switchMap(() => {
        const clientId = environment.clientId;
        const redirectUri = environment.redirectUri;
        const scopes = environment.scopes;
        const authUrl = `${environment.authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true`;

        window.location.href = authUrl;
        return of(null as any);
      })
    )
  );
}
