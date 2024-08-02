import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayControlsComponent } from './play-controls.component';

describe('PlayControlsComponent', () => {
  let component: PlayControlsComponent;
  let fixture: ComponentFixture<PlayControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
