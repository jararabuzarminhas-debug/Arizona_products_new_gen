import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'bye-bye-fever',
    loadComponent: () => import('./pages/bye-bye-fever.component').then(m => m.ByeByeFeverComponent)
  },
  {
    path: 'shop',
    loadComponent: () => import('./pages/shop.component').then(m => m.ShopComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'testimonials',
    loadComponent: () => import('./pages/testimonials.component').then(m => m.TestimonialsComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
