import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksInAlbumComponent } from './tracks-in-album.component';

describe('TracksInAlbumComponent', () => {
  let component: TracksInAlbumComponent;
  let fixture: ComponentFixture<TracksInAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TracksInAlbumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TracksInAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
