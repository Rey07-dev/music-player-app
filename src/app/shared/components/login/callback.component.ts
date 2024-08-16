import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/models/services/spotify/auth.service';

@Component({
  selector: 'app-callback',
  styleUrls: ['./login.component.css'],
  template: '<p class="loading"><mat-spinner></mat-spinner> Loading...</p>',
})
export class CallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.authService.handleAuthCallback(code);
      } else {
        console.error('No authorization code found in the URL');
      }
    });
  }
}
