export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: string | null;
  total: number;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Artist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface ArtistsResponse {
  artists: Artist[];
}

// Login and signup response for uses

export interface Signup {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface LoginResponse {
  refresh_token: string;
  login_token: string,
  message: string
}

export interface RefreshTokenResponse{
  login_token: string,
  message: string,
  refresh_token: string
}

export interface GetProfile{
  email: string,
  first_name: string,
  id: string,
  last_name: string
}
