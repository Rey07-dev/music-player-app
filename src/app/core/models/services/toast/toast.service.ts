import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private toastSubject = new Subject<{
    message: string;
    type: "success" | "error" | "info";
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  }>();
  toastState$ = this.toastSubject.asObservable();

  showToast(
    message: string,
    type: "success" | "error" | "info" = "info",
    position:
      | "top-right"
      | "top-left"
      | "bottom-right"
      | "bottom-left" = "top-right"
  ): void {
    this.toastSubject.next({ type, message, position });
  }

  getStoredData(keyName: string) {
    return localStorage.getItem(keyName)
      ? JSON.parse(localStorage.getItem(keyName)!)
      : null;
  }
}
