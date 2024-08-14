import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { debounceTime, map, tap } from "rxjs/operators";
import { PlaybackService } from "../../core/models/services/play/playback.service";
import {
  selectTrack,
  playTrack,
  pauseTrack,
  trackEnded,
  nextTrack,
  previousTrack,
} from "./playMusic.actions";

@Injectable()
export class PlayMusicEffects {
  constructor(
    private actions$: Actions,
    private playbackService: PlaybackService
  ) {}

  selectAndPlayTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectTrack),
      tap(({ track }) => {
        if (track) {
          console.log('in the effect', track);
          const trackIndex = this.playbackService.playlist.findIndex(t => t.id === track.id);
          if (trackIndex !== -1) {
            this.playbackService.playTrack(trackIndex);
          } else {
            console.error('Track not found in playlist', track);
          }
        } else {
          console.error('Track is undefined or null');
        }
      })
    ), { dispatch: false }
  );

  playTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playTrack),
      debounceTime(100),
      tap((data: any) => {
        console.log('in the effect for play', data);
        if (this.playbackService.currentIndex !== -1) {
          const track = this.playbackService.playlist[this.playbackService.currentIndex];
          if (track) {
            this.playbackService.playTrack(this.playbackService.currentIndex);
          } else {
            console.error('No track found for the current index');
          }
        } else {
          console.error('Current index is invalid');
        }
      })
    ), { dispatch: false }
  );


  // pauseTrack$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(pauseTrack),
  //       tap((data) => {
  //         console.log("Pausing playback", data);
  //         this.playbackService.pauseTrack();
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // trackEnded$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(trackEnded),
  //       tap((data) => {
  //         console.log("Track ended", data);
  //         this.playbackService.trackFinished();
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // nextTrack$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(nextTrack),
  //       tap((data) => {
  //         console.log("Going to next track", data);
  //         this.playbackService.nextTrack();
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // previousTrack$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(previousTrack),
  //       tap((data) => {
  //         console.log("Going to previous track", data);
  //         this.playbackService.previousTrack();
  //       })
  //     ),
  //   { dispatch: false }
  // );
}
