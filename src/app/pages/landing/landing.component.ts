import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { WhyUsComponent } from '../../components/why-us/why-us.component';
import { CollectionShowcaseComponent } from '../../components/collection-showcase/collection-showcase.component';
import { AboutComponent } from '../../components/about/about.component';
import { ContactComponent } from '../../components/contact/contact.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    WhyUsComponent,
    CollectionShowcaseComponent,
    AboutComponent,
    ContactComponent
  ],
  template: `
    <app-header></app-header>
    <app-hero></app-hero>
    <app-about></app-about>
    <app-collection-showcase></app-collection-showcase>
    <app-why-us></app-why-us>
    <app-contact></app-contact>
  `
})
export class LandingComponent {} 