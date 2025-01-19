import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  menuItems = [
    { label: 'Products', path: '/products' },
    { label: 'About Us', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact Us', path: '/contact' }
  ];

  ngOnInit() {
    // Check initial scroll position
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  checkScroll() {
    // Change background when scrolled past 100vh
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > window.innerHeight * 0.8; // Start transition at 10% of viewport height
  }
}
