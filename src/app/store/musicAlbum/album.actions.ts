import { createAction, props } from '@ngrx/store';
import { Album, AlbumList } from '../../core/models/interfaces/music/album';
import { HttpErrorResponse } from '@angular/common/http';
import { IAlbum, IAlbumItem } from '../../core/models/interfaces/spotify';

export const albumRequestSuccess = createAction(
  '[HTTP] Album Request Success',
  props<{ response: Album[] }>()
);

export const albumRequestFailure = createAction(
  '[HTTP] Album Request Failure',
  props<{ error: HttpErrorResponse }>()
);
export const albumRequestStart= createAction(
  '[HTTP] Album Request Start',
)

export const getAlbum = createAction(
  '[Album] Get Albums',
  props<{ albumList: IAlbumItem }>()
);
