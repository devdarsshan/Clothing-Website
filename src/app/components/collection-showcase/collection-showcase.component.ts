import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-collection-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection-showcase.component.html',
  styleUrl: './collection-showcase.component.scss'
})
export class CollectionShowcaseComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.initAnimations();
      }, 100);
    }
  }

  private initAnimations(): void {
    // Set initial states
    gsap.set('.category-card', { opacity: 0, y: 50 });
    gsap.set('.customization-card', { opacity: 0, y: 30 });

    // Animate category cards
    gsap.to('.category-card', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.category-card',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    // Animate customization cards
    gsap.to('.customization-card', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.customization-card',
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    });
  }
}
