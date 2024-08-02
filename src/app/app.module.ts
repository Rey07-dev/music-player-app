import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { themeReducer } from './store/theme/theme.reducer';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet,
    RouterModule,
    RouterModule.forRoot(AppRoutes),
    StoreModule.forRoot({ theme: themeReducer }),
    SharedModule,
    MatButtonModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
