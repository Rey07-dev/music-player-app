import { NgModule } from "@angular/core";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { PlayControlsComponent } from "./components/play-controls/play-controls.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ThemeToggleComponent } from "./components/theme-toggle/theme-toggle.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MusicCardComponent } from "./components/music-card/music-card.component";
import { CardComponent } from "./components/card/card.component";
import { MusicMenuComponent } from "./components/music-menu/music-menu.component";
import { ControlIconComponent } from "./components/control-icon/control-icon.component";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule } from "@angular/router";
import { AppRoutes } from "../app.routes";
import { HomeCarouselComponent } from './components/home-carousel/home-carousel.component';
import { LoginComponent } from './components/login/login.component';
import { CallbackComponent } from "./components/login/callback.component";
import { TracksInAlbumComponent } from './components/tracks-in-album/tracks-in-album.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    PlayControlsComponent,
    ThemeToggleComponent,
    MusicCardComponent,
    CardComponent,
    MusicMenuComponent,
    ControlIconComponent,
    HomeCarouselComponent,
    LoginComponent,
    CallbackComponent,
    TracksInAlbumComponent
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatTooltipModule,
    NgOptimizedImage,
    RouterModule.forRoot(AppRoutes),
    NgOptimizedImage,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    PlayControlsComponent,
    ThemeToggleComponent,
    MusicCardComponent,
    CardComponent,
    MusicMenuComponent,
    ControlIconComponent,
    HomeCarouselComponent,
    LoginComponent
  ],
})
export class SharedModule {}
