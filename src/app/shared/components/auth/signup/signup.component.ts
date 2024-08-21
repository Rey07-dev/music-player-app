import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { LoginComponent } from "../login/login.component";
import { AuthService } from "../../../../core/models/services/auth/auth.service";
import { ToastService } from "../../../../core/models/services/toast/toast.service";

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<SignupComponent>,
    public dialog: MatDialog,
    private toastService: ToastService
  ) {
    this.signupForm = this.fb.group({
      first_name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      last_name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(passwordRegex),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe({
        next: (response) => {
          this.openModal();
          this.toastService.showToast(response.message, "success");
        },
        error: (err) => {
          this.toastService.showToast(err.error.error, "error");
        },
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  openModal() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: "50%",
      height: "48%",
    });
    dialogRef.afterClosed();
    this.close();
  }
}
