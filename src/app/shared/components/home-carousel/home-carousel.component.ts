import { Component } from "@angular/core";
import { slides } from "../../../core/constants/slide";

@Component({
  selector: "app-home-carousel",
  templateUrl: "./home-carousel.component.html",
  styleUrl: "./home-carousel.component.css",
})
export class HomeCarouselComponent {

  slides = slides;
  currentIndex = 0;
  intervalId!: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  prevSlide() {
    this.currentIndex =
      this.currentIndex > 0 ? this.currentIndex - 1 : this.slides.length - 1;
  }

  nextSlide() {
    this.currentIndex =
      this.currentIndex < this.slides.length - 1 ? this.currentIndex + 1 : 0;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
