import { SpotifyPlayerService } from "./../../../core/models/services/spotify/spotify-player.service";
import { SpotifyService } from "./../../../core/models/services/spotify/spotify.service";
import { AuthService } from "./../../../core/models/services/auth/auth.service";
import { Component, HostBinding, HostListener } from "@angular/core";
import { Store, select } from "@ngrx/store";
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  switchMap,
} from "rxjs";
import { ThemeState } from "../../../core/models/interfaces/types";
import { SpotifyState } from "../../../store/spotify/spotify.reducer";
import { SpotifySearchService } from "../../../core/models/services/search/spotify-search.service";
import { SearchResponse } from "../../../core/models/interfaces/search";
import { SpotifyAuthService } from "../../../core/models/services/spotify/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { LoginComponent } from "../auth/login/login.component";
import { Router } from "@angular/router";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
  isDarkTheme$: Observable<boolean>;
  isDrop: boolean = false;
  results$!: Observable<SearchResponse>;
  isLoggedIn: boolean = false;
  loginModel: boolean = false;
  type: string = "track";
  isSearching: boolean = false;

  constructor(
    private store: Store<{ theme: ThemeState; spotify: SpotifyState }>,
    private spotifyAuthService: SpotifyAuthService,
    private spotifySearchService: SpotifySearchService,
    public dialog: MatDialog,
    private route: Router,
    private spotifyPlayerService: SpotifyPlayerService
  ) {
    this.isDarkTheme$ = this.store.pipe(
      select((state) => state.theme.isDarkTheme)
    );
  }

  ngOnInit() {
    this.isDarkTheme$.subscribe((isDark) => {
      const themeClass = isDark ? "dark-theme" : "light-theme";
      document.body.classList.remove("dark-theme", "light-theme");
      document.body.classList.add(themeClass);
    });
  }

  token$ = this.store.select((state) => state.spotify.token);

  toggleProfile() {
    this.isDrop = !this.isDrop;
  }

  logout() {
    this.isLoggedIn = false;
    this.spotifyAuthService.logout();
    this.isDrop = false;
    this.openModal();
  }

  openModal() {
    this.isDrop = false;
    const dialogRef = this.dialog.open(LoginComponent, {
      width: "50%",
      height: "48%",
    });
    dialogRef.afterClosed();
  }

  onSearch(query: HTMLInputElement): void {
    const searchTerm = query.value;
    this.isSearching = true;
    if (query !== null) {
      this.results$ = this.spotifySearchService
        .search(searchTerm, [this.type])
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((results) => {
            return of(results);
          })
        );
    } else {
      console.error("Query is empty");
    }
  }

  getArtistNames(track: any): string {
    return track.artists.map((artist: any) => artist.name).join(", ");
  }

  playTrack(track: any) {
    if (track.type == "track") {
      this.spotifyPlayerService.play(track.album.uri);
    } else if (track.type == "album") {
      this.spotifyPlayerService.play(track.uri);
    }
    this.isSearching = false;
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick() {
    this.isSearching = false;
  }

  clearSearchInput(query: HTMLInputElement): void {
    query.value = "";
  }

  onItemSelected(selectedItem: any, query: HTMLInputElement): void {
    if (selectedItem.type == "track" || selectedItem.type == "album") {
      this.playTrack(selectedItem);
    } else{
      console.log('selectedItem', selectedItem)
      this.route.navigate([`/artist/${selectedItem.id}`]);
    }
    this.clearSearchInput(query);
  }
}
