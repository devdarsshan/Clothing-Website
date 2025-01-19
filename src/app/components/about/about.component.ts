import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, AfterViewInit {
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
    // Animate hero content
    gsap.from('.hero-content', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.hero-content',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate core value cards with stagger
    gsap.from('.core-value-card', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.core-value-card',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate stats
    this.initStatsAnimation();
  }

  private initStatsAnimation(): void {
    const stats = document.querySelectorAll('[data-value]');
    
    stats.forEach(stat => {
      const finalValue = parseInt(stat.getAttribute('data-value') || '0', 10);
      const text = stat.textContent || '';
      const isSustainable = text.includes('%');

      if (text === '24/7') return; // Skip animation for 24/7

      gsap.fromTo(stat,
        { textContent: '0' },
        {
          textContent: finalValue,
          duration: 2,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: stat,
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
          },
          snap: { textContent: 1 },
          onUpdate: function(this: any) {
            const value = Math.round(this.targets()[0].textContent);
            this.targets()[0].textContent = value + (isSustainable ? '%' : '+');
          }
        }
      );
    });
  }
}
