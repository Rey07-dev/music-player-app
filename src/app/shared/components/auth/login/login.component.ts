import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { passwordRegex, SignupComponent } from '../signup/signup.component';
import { AuthService } from '../../../../core/models/services/auth/auth.service';
import { asyncEmailValidator } from '../../../../core/models/validator/email';
import { ToastService } from '../../../../core/models/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email],[asyncEmailValidator]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(passwordRegex)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.toastService.showToast(response.message, "success");
          localStorage.setItem('token', response.login_token);
          localStorage.setItem('refresh_token', response.refresh_token);
          this.close();
        },
        error: (err) => {
          this.toastService.showToast(err.error.error, "error");
        }
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  openModal() {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '50%',
      height: '65%',
    });
    dialogRef.afterClosed()
    this.close()
  }
}
