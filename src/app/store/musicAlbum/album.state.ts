import { HttpErrorResponse } from "@angular/common/http";
import { Album } from "../../core/models/interfaces/music/album";
import { IAlbum } from "../../core/models/interfaces/spotify";

export interface AlbumState {
  albums: Album[] | null;
  error: HttpErrorResponse | null;
  loading: boolean;
}

export const initialState: AlbumState = {
  albums: [],
  error: null,
  loading: false
};

