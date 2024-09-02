import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../core/models/services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  message: string = '';
  type: 'success' | 'error' | 'info' = 'info';
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-right';
  duration: number = 5000;
  isVisible: boolean = false;
  private toastSubscription!: Subscription;

  constructor(private toastService: ToastService) {}


  ngOnInit(): void {
     this.toastSubscription = this.toastService.toastState$.subscribe((toast) => {
      this.message = toast.message;
      this.type = toast.type;
      this.position = toast.position;
      this.showToast();
    });
  }

  ngOnDestroy(): void {
    this.toastSubscription.unsubscribe();
  }

  showToast(): void {
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, this.duration);
  }
}
