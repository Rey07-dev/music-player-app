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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule } from "@angular/router";
import { AppRoutes } from "../app.routes";
import { HomeCarouselComponent } from './components/home-carousel/home-carousel.component';
import { SpotifyLoginComponent } from './components/login/login.component';
import { CallbackComponent } from "./components/login/callback.component";
import { TracksInAlbumComponent } from './components/tracks-in-album/tracks-in-album.component';
import { LoginComponent } from "./components/auth/login/login.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DurationPipe } from "../core/models/pipes/duration.pipe";
import { TracksComponent } from './components/tracks/tracks.component';



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
    CallbackComponent,
    TracksInAlbumComponent,
    SpotifyLoginComponent,
    LoginComponent,
    SignupComponent,
    DurationPipe,
    TracksComponent
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressBarModule
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
    SpotifyLoginComponent,
    LoginComponent,
    SignupComponent,
    DurationPipe
  ],
})
export class SharedModule {}
