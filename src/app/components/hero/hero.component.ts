import { Component, OnInit, ViewChild, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {
  @ViewChild('heroContent') heroContent!: ElementRef;
  @ViewChild('techText') techText!: ElementRef;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.initAnimation();
    }
  }

  scrollToContact(event: Event) {
    if (this.isBrowser) {
      event.preventDefault();
      const element = document.querySelector('#contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  private initAnimation() {
    // Wait for view initialization
    setTimeout(() => {
      // Hero content animation
      gsap.to(this.heroContent.nativeElement, {
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: 'power2.out'
      });

      // Tech text animation
      gsap.to(this.techText.nativeElement, {
        opacity: 1,
        x: '-100px',
        duration: 1,
        delay: 0.8,
        ease: 'power2.out'
      });
    }, 0);
  }
}
