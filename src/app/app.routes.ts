import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: '**', redirectTo: '' }  // Redirect any unknown paths to home
];
