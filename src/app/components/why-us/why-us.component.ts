import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSPlugin } from 'gsap/CSSPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, CSSPlugin);

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss'
})
export class WhyUsComponent implements OnInit, AfterViewInit {
  constructor(private el: ElementRef) {}

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
    ScrollTrigger.refresh();
  }

  ngAfterViewInit() {
    // Ensure DOM is ready
    requestAnimationFrame(() => {
      this.initScrollAnimations();
    });
  }

  private initScrollAnimations() {
    const aboutSection = this.el.nativeElement;
    const questionsContainer = aboutSection.querySelector('.questions-container');
    const scrollContainer = aboutSection.querySelector('.custom-scrollbar');

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

    // First animate the fixed side
    tl.fromTo(aboutSection.querySelector('.fixed-side'),
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
    ).fromTo('.why-us-section', 
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
    
    questionElements.forEach((element: Element, index: number) => {
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
    ScrollTrigger.refresh();
  }
}
