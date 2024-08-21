import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpotifyLoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: SpotifyLoginComponent;
  let fixture: ComponentFixture<SpotifyLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpotifyLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
