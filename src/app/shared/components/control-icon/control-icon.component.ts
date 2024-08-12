import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-control-icon',
  templateUrl: './control-icon.component.html',
  styleUrls: ['./control-icon.component.css']
})
export class ControlIconComponent {
  @Input() iconClass!: string;
  @Input() ariaLabel!: string;
  @Input() showIcon: boolean = true;
  @Output() iconClick: EventEmitter<void> = new EventEmitter();
  @Output() keyPress: EventEmitter<KeyboardEvent> = new EventEmitter();
  @Output() keyDown: EventEmitter<KeyboardEvent> = new EventEmitter();
  @Output() keyUp: EventEmitter<KeyboardEvent> = new EventEmitter();

  onIconClick() {
    this.iconClick?.emit();
  }

  onKeyPress(event: KeyboardEvent) {
    this.keyPress.emit(event);
  }

  onKeyDown(event: KeyboardEvent) {
    this.keyDown.emit(event);
  }

  onKeyUp(event: KeyboardEvent) {
    this.keyUp.emit(event);
  }
}
