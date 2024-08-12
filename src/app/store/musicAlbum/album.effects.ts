import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as albumActions from './album.actions';
import { MusicService } from '../../core/models/services/music.service';
import { Album } from '../../core/models/interfaces/music/album';

@Injectable()
export class AlbumEffects {
  constructor(
    private albumActions$: Actions,
    private musicService: MusicService,
  ) {}
  albumData$ = createEffect(() =>
    this.albumActions$.pipe(
      ofType(albumActions.albumRequestStart),
      switchMap(() =>
        this.musicService.getAlbums('112024').pipe(
          map((response) => {
            return albumActions.albumRequestSuccess({  response: response.album});
          }),
          catchError((error: HttpErrorResponse) => {
            return of(albumActions.albumRequestFailure({ error }));
          })
        )
      )
    )
  );
}
