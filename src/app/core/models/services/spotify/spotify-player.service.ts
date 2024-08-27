import { ToastService } from "./../toast/toast.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { playerControl } from "../../../constants/slide";
import { CurrentTrackPlaying, PlayingSongState } from "../../interfaces/spotify";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: typeof Spotify;
  }
}

@Injectable({
  providedIn: "root",
})
export class SpotifyPlayerService {
  player: Spotify.Player | undefined;
  device_id!: string;
  public isPaused: boolean = true;

  constructor(private http: HttpClient, private toastService: ToastService) {
    this.loadSpotifySDK();
  }

  loadSpotifySDK() {
    if (!window.Spotify) {
      const script = document.createElement("script");
      script.src = environment.script_for_player;
      script.onload = () => {
        this.initializePlayer();
      };
      document.body.appendChild(script);
    } else {
      this.initializePlayer();
    }
  }

  initializePlayer() {
    const token = localStorage.getItem("spotify_token");

    if (!token) {
      console.error("Spotify token not found in localStorage.");
      return;
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      this.player = new window.Spotify.Player({
        name: "Angular Spotify Player",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      this.player.addListener("ready", ({ device_id }) => {
        this.device_id = device_id;
        localStorage.setItem("device_id", device_id);
      });

      this.player.addListener("player_state_changed", (state: PlayingSongState) => {
        if (!state) {
          return;
        }
        localStorage.setItem("player_state", JSON.stringify(state));
      });

      this.player.connect();
    };

    if (window.Spotify && window.onSpotifyWebPlaybackSDKReady) {
      window.onSpotifyWebPlaybackSDKReady();
    }
  }

  getStoredData(keyName: string) {
    return localStorage.getItem(keyName)
      ? JSON.parse(localStorage.getItem(keyName)!)
      : null;
  }

  play(uri: string, playlists?: string[]) {
    if (!this.player) {
      this.toastService.showToast("Player not initialized", "error");
      console.error("Player not initialized");
      return;
    }
    const deviceId = this.device_id
    const url = `${environment.playerURL}${playerControl.play}?device_id=${deviceId}`;
    const currentTrack: PlayingSongState = this.toastService.getStoredData('player_state');
    const currentTime = this.toastService.getStoredData('currentTime')

    const playData = currentTrack.track_window.current_track.album.uri === uri
    ? {
        uris: [currentTrack.track_window.current_track.uri],
        offset: { position: 0 },
        position_ms: currentTime ?? 0,
      }
    : {
        context_uri: uri,
        offset: { position: 0 },
      };

    this.http.put(url, playData).subscribe({
      error: (err) => {
        if (err.status !== 200) {
          this.toastService.showToast(err.error.error.message, "error");
        }
        console.error(err);
      },
    });
  }

  pause() {
    const deviceId = this.device_id || localStorage.getItem("device_id");
    const url = `${environment.playerURL}${playerControl.pause}?device_id=${deviceId}`;

    this.http.put(url, {}).subscribe({
      error: (err) => {
        if (err.status !== 200) {
          this.toastService.showToast(err.error.error.message, "error");
        }
        console.error(err);
      },
    });
  }

  next() {
    const deviceId = this.device_id || localStorage.getItem("device_id");
    const url = `${environment.playerURL}${playerControl.next}?device_id=${deviceId}`;

    this.http.post(url, {}).subscribe({
      error: (err) => {
        if (err.status !== 200) {
          this.toastService.showToast(err.error.error.message, "error");
        }
        console.error(err);
      },
    });
  }

  previous() {
    const deviceId = this.device_id || localStorage.getItem("device_id");
    const url = `${environment.playerURL}${playerControl.previous}?device_id=${deviceId}`;

    this.http.post(url, {}).subscribe({
      error: (err) => {
        if (err.status !== 200) {
          this.toastService.showToast(err.error.error.message, "error");
        }
        console.error(err);
      },
    });
  }

  getCurrentlyPlayingTrack() {
    return this.http.get<CurrentTrackPlaying>(`${environment.playerURL}${playerControl.currentlyPlaying}`, {})
  }

  seekToPosition(positionMs: number): void {
    this.http.put(`${environment.playerURL}${playerControl.seek}?position_ms=${positionMs}`, null, {})
      .subscribe(
        error => {
          this.toastService.showToast('Seek failed', 'error');
          console.error('Seek failed', error)
        }
      );
  }
}
