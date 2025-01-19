import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.initAnimations();
    }
  }

  private initAnimations() {
    // Animate hero section
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

    // Animate core value cards
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
    const stats = document.querySelectorAll('[data-value]');
    stats.forEach(stat => {
      const finalValue = parseInt(stat.getAttribute('data-value') || '0');
      const isSustainable = stat.textContent?.includes('%');
      
      gsap.fromTo(stat, 
        { textContent: '0' + (isSustainable ? '%' : '+') },
        {
          duration: 2,
          textContent: finalValue,
          snap: { textContent: 1 },
          ease: 'power1.inOut',
          onUpdate: function(this: any) {
            const value = Math.round(this['targets']()[0].textContent);
            this['targets']()[0].textContent = value + (isSustainable ? '%' : '+');
          },
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }
}
