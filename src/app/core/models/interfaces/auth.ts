export interface SpotifyRefreshTokenResponse {
  refresh_token: string;
  access_token: string;
  expires_in: number;
  token_type?: string;
  scope?: string;
}
