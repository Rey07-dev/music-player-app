import { NgModule } from "@angular/core";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { PlayControlsComponent } from "./components/play-controls/play-controls.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NavbarComponent } from "./components/navbar/navbar.component";


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    PlayControlsComponent,
    ThemeToggleComponent
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatTooltipModule,
    NgOptimizedImage
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    PlayControlsComponent
  ],
})
export class SharedModule {}
