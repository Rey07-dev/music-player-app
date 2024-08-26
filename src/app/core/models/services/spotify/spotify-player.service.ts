import { ToastService } from "./../toast/toast.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { playerControl } from "../../../constants/slide";
import { CurrentTrackPlaying } from "../../interfaces/spotify";

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
      script.src = environment.srcipt_for_player;
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
        getOAuthToken: (cb: any) => {
          cb(token);
        },
        volume: 0.5,
      });

      this.player.addListener("ready", ({ device_id }: any) => {
        this.device_id = device_id;
        localStorage.setItem("device_id", device_id);
      });

      this.player.addListener("player_state_changed", (state: any) => {
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
      ? this.device_id
      : localStorage.getItem("device_id");
    const url = `${environment.playerURL}${playerControl.play}?device_id=${deviceId}`;

    const playData = {
      context_uri: uri,
      uris: playlists,
      offset: { position: 0 },
      position_ms: 0,
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
        error => console.error('Seek failed', error)
      );
  }
}
