import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { PlaybackService } from "../../core/models/services/play/playback.service";
import { nextTrack, pauseTrack, playTrack, previousTrack, selectTrack } from "./playMusic.actions";

@Injectable()
export class PlayMusicEffects {
  constructor(
    private actions$: Actions,
    private playbackService: PlaybackService
  ) {}

  selectAndPlayTrack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(selectTrack),
        tap(({ track }) => {
          if (track) {
            const trackIndex = this.playbackService.playlist.findIndex(
              (t) => t.id === track.id
            );
            if (trackIndex !== -1) {
              this.playbackService.playTrack(trackIndex);
            } else {
              console.error("Track not found in playlist", trackIndex);
            }
          } else {
            console.error("Track is undefined or null");
          }
        })
      ),
    { dispatch: false }
  );

  playTrack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(playTrack),
        tap(() => {
          this.playbackService.playTrack(1);
        })
      ),
    { dispatch: false }
  );

   pauseTrack$ = createEffect(
     () =>
       this.actions$.pipe(
         ofType(pauseTrack),
         tap(() => {
           this.playbackService.pauseTrack();
         })
       ),
     { dispatch: false }
   );

   nextTrack$ = createEffect(
     () =>
       this.actions$.pipe(
         ofType(nextTrack),
         tap(() => {
           this.playbackService.nextTrack();
         })
       ),
     { dispatch: false }
   );

   previousTrack$ = createEffect(
     () =>
       this.actions$.pipe(
         ofType(previousTrack),
         tap(() => {
           this.playbackService.previousTrack();
         })
       ),
     { dispatch: false }
   );
}
