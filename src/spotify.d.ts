declare namespace Spotify {
  interface PlayerOptions {
    name: string;
    getOAuthToken: (callback: (token: string) => void) => void;
    volume?: number;
  }

  class Player {
    constructor(options: PlayerOptions);

    connect(): Promise<boolean>;
    disconnect(): void;

    addListener(event: string, callback: (arg: any) => void): void;
    removeListener(event: string): void;

    pause(): Promise<void>;
    resume(): Promise<void>;
    nextTrack(): Promise<void>;
    previousTrack(): Promise<void>;
  }
}

interface Window {
  onSpotifyWebPlaybackSDKReady: () => void;
  Spotify: typeof Spotify;
}
