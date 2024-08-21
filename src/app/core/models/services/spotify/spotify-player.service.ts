import { Injectable } from "@angular/core";
import { PlayingSongState } from "../../interfaces/spotify";
import { Store } from "@ngrx/store";
import { environment } from "../../../../../environments/environment";
import { playerControl } from "../../../constants/slide";

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
  player: any;
  device_id!: string;
  public isPaused: boolean = true;

  constructor(private store: Store<{ playingSong: PlayingSongState }>) {
    this.loadSpotifySDK();
  }

  loadSpotifySDK() {
    if (!window.Spotify) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
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
        this.isPaused = state.paused;
        localStorage.setItem("player_state", JSON.stringify(state));
      });

      this.player.connect();
    };

    if (window.Spotify && window.onSpotifyWebPlaybackSDKReady) {
      window.onSpotifyWebPlaybackSDKReady();
    }
  }

  play(uri: string, playlists?: string[]) {
    if (!this.player) {
      console.error("Player not initialized");
      return;
    }

    const token = localStorage.getItem("spotify_token");
    const playData = {
      context_uri: uri,
      uris: playlists,
      offset: {
        position: 0,
      },
      position_ms: 0,
    };
    const deviceId = this.device_id
      ? this.device_id
      : localStorage.getItem("device_id");
    fetch(
      `${environment.playerURL}${playerControl.play}?device_id=${deviceId}`,
      {
        method: "PUT",
        body: JSON.stringify(playData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then();
  }

  pause() {
    const deviceId = this.device_id || localStorage.getItem("device_id");
    const token = localStorage.getItem("spotify_token");
    fetch(
      `${environment.playerURL}${playerControl.pause}?device_id=${deviceId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then();
  }

  next() {
    const deviceId = this.device_id || localStorage.getItem("device_id");
    const token = localStorage.getItem("spotify_token");

    fetch(
      `${environment.playerURL}${playerControl.next}?device_id=${deviceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then();
  }

  previous() {
    const deviceId = this.device_id || localStorage.getItem("device_id");
    const token = localStorage.getItem("spotify_token");

    fetch(
      `${environment.playerURL}${playerControl.previous}?device_id=${deviceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then();
  }
}
