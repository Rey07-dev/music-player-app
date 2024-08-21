import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  @Input({required: true}) message: string = '';
  @Input({required: true}) type: 'success' | 'error' | 'info' = 'info';
  @Input() duration: number = 3000;
  @Input() position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-right';

  isVisible: boolean = false;

  ngOnInit(): void {
    this.showToast();
  }

  showToast(): void {
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, this.duration);
  }
}
