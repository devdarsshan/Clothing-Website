import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isBrowser: boolean;
  isMenuOpen = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  menuItems = [
    { label: 'Home', path: '#home', isScroll: true },
    { label: 'Products', path: '#products', isScroll: true },
    { label: 'About Us', path: '#about', isScroll: true },
    { label: 'Contact Us', path: '#contact', isScroll: true }
  ];

  ngOnInit() {
    if (this.isBrowser) {
      this.checkScroll();
    }
  }

  @HostListener('window:scroll', [])
  checkScroll() {
    if (this.isBrowser) {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.isScrolled = scrollPosition > window.innerHeight * 0.8;
    }
  }

  scrollToSection(event: Event, path: string, isScroll: boolean) {
    if (isScroll && this.isBrowser) {
      event.preventDefault();
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        this.isMenuOpen = false; // Close menu after clicking
      }
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
