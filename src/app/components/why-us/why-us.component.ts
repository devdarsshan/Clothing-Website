import { Component, OnInit, AfterViewInit, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSPlugin } from 'gsap/CSSPlugin';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss'
})
export class WhyUsComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  questions = [
    {
      question: 'What makes Techwear different?',
      answer: "Techwear merges advanced materials with innovative design, offering apparel that's not only stylish but also functional."
    },
    {
      question: 'Is Techwear for everyday use?',
      answer: "Absolutely. Techwear is designed for versatility. Whether you're navigating the urban jungle or exploring the great outdoors"
    },
    {
      question: 'How does Techwear incorporate technology into its designs?',
      answer: "Techwear integrates advanced fabrics and smart features, such as water resistance, breathability, and temperature control, ensuring that you stay comfortable and prepared, no matter the conditions."
    },
    {
      question: 'Is Techwear sustainable?',
      answer: "Yes, sustainability is a key focus. Many Techwear items are crafted from eco-friendly materials and designed to last, reducing the need for frequent replacements and minimizing environmental impact."
    },
    {
      question: 'Can I customize my Techwear gear?',
      answer: "Techwear embraces individuality. Our pieces are designed with modularity in mind, allowing you to adapt and personalize your gear to match your unique style and functional needs."
    }
  ];

  ngOnInit() {
    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger, CSSPlugin);
      ScrollTrigger.refresh();
    }
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.initScrollAnimations();
      }, 100);
    }
  }

  private initScrollAnimations() {
    const aboutSection = this.el.nativeElement;
    const questionsContainer = aboutSection.querySelector('.questions-container');
    const scrollContainer = aboutSection.querySelector('.custom-scrollbar');

    if (!questionsContainer || !scrollContainer) return;

    // Prevent direct scrolling on the right side and redirect to main page scroll
    scrollContainer.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
      
      // Simulate scroll on the main window
      window.scrollBy({
        top: e.deltaY,
        behavior: 'auto'
      });
    }, { passive: false });

    // Create a timeline for the initial section animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.why-us-section',
        start: 'top center',
        end: 'top top',
        scrub: 1,
        toggleActions: 'play none none reverse'
      }
    });

    const fixedSide = aboutSection.querySelector('.fixed-side');
    if (fixedSide) {
      tl.fromTo(fixedSide,
        {
          autoAlpha: 0,
          y: 100
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out'
        }
      );
    }

    tl.fromTo('.why-us-section', 
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power2.out'
      },
      '-=0.5'
    );

    // Create a scroll-driven timeline for questions
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.why-us-section',
        start: 'top top',
        end: `+=${questionsContainer.scrollHeight}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    // Animate the scroll position of the questions container
    scrollTl.to(scrollContainer, {
      scrollTop: questionsContainer.scrollHeight,
      ease: 'none'
    });

    // Questions fade in animations
    const questionElements = aboutSection.querySelectorAll('.question-item');
    
    questionElements.forEach((element: Element) => {
      element.classList.add('gsap-init');

      gsap.fromTo(element, 
        {
          autoAlpha: 0,
          y: 100
        },
        {
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'top center',
            toggleActions: 'play none none reverse',
            containerAnimation: scrollTl,
            scrub: 1
          },
          autoAlpha: 1,
          y: 0,
          ease: 'power2.inOut'
        }
      );
    });

    // Refresh ScrollTrigger after setup
    if (this.isBrowser) {
      ScrollTrigger.refresh();
    }
  }
}
