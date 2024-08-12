import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicMenuComponent } from './music-menu.component';

describe('MusicMenuComponent', () => {
  let component: MusicMenuComponent;
  let fixture: ComponentFixture<MusicMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
