import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, switchMap } from "rxjs";
import { nextTrack, pauseTrack, playTrack, previousTrack } from "./playMusic.actions";

@Injectable()

export class PlayMusicEffects {

  constructor(private actions$: Actions) {}

  playTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playTrack),
      switchMap(() => of(playTrack()))
    )
  );

  // nextTrack$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(nextTrack),
  //     switchMap(() => of(nextTrack()))
  //   )
  // );

  // previousTrack$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(previousTrack),
  //     switchMap(() => of(previousTrack()))
  //   )
  // );

  // pauseTrack$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(pauseTrack),
  //     switchMap(() => of(pauseTrack()))
  //   )
  // );
}
