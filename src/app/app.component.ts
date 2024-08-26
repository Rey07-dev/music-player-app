import { Component } from "@angular/core";
import { ToastService } from "./core/models/services/toast/toast.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "music-player-app";
  isLoggedIn: boolean = false;

  toastState$!: Observable<{
    message: string;
    type: "success" | "error" | "info";
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  }>;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastState$ = this.toastService.toastState$;
  }

  ngOnDestroy(): void {
    localStorage.removeItem("device_id");
  }
}
