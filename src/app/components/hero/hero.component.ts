import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  ngOnInit() {
    this.initAnimation();
  }

  private initAnimation() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }});
    
    // Initial zoom out animation for background
    tl.to('.hero-bg', {
      duration: 2,
      scale: 1,
      ease: 'power2.out'
    });

    // Fade in and slide up content
    tl.to(this.heroContent.nativeElement, {
      duration: 1,
      opacity: 1,
      y: 0,
      ease: 'power4.out'
    }, '-=1.5'); // Start slightly before bg animation ends

    // Fade in the TECH WEAR text
    tl.to(this.techText.nativeElement, {
      duration: 1,
      opacity: 1,
      x: 0,
      ease: 'power4.out'
    }, '-=0.8');
  }

  ngAfterViewInit() {
    // Set initial states
    gsap.set(this.heroContent.nativeElement, {
      opacity: 0,
      y: 100
    });
    
    gsap.set(this.techText.nativeElement, {
      opacity: 0,
      x: 100
    });

    this.initAnimation();
  }

  scrollToContact(event: Event) {
    event.preventDefault();
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
