import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, AfterViewInit {
  @ViewChild('heroContent') heroContent!: ElementRef;
  @ViewChild('techText') techText!: ElementRef;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // No browser-specific code needed in OnInit
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.initAnimation();
      }, 100);
    }
  }

  scrollToContact(event: Event) {
    if (this.isBrowser) {
      event.preventDefault();
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  private initAnimation() {
    if (!this.heroContent?.nativeElement || !this.techText?.nativeElement) return;

    // Set initial states
    gsap.set(this.heroContent.nativeElement, { opacity: 0, y: 30 });
    gsap.set(this.techText.nativeElement, { opacity: 0, y: 20 });

    // Create timeline for hero animations
    const tl = gsap.timeline();

    tl.to(this.heroContent.nativeElement, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    })
    .to(this.techText.nativeElement, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5');
  }
}
