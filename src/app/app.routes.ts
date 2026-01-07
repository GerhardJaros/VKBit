import { Routes } from '@angular/router';
import { ROUTES } from './routes.constants';
import { AuthGuard } from './guards/auth.guard';

// Lazy Loading-Komponenten
export const routes: Routes = [
  {
    path: ROUTES.HOME,
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    title: 'Angular Schulung - Home'
  },
  {
    path: ROUTES.KOMPONENTEN,
    loadComponent: () => import('./examples/01-komponenten/komponenten-beispiel.component').then(m => m.KomponentenBeispielComponent),
    title: 'Komponenten-Beispiel'
  },
  {
    path: ROUTES.FORMULARE,
    loadComponent: () => import('./examples/02-formulare/formulare-beispiel.component').then(m => m.FormulareBeispielComponent),
    title: 'Formulare-Beispiel'
  },
  {
    path: ROUTES.KOMMUNIKATION,
    loadComponent: () => import('./examples/03-kommunikation/eltern.component').then(m => m.ElternComponent),
    title: 'Komponenten-Kommunikation'
  },
  {
    path: ROUTES.ROUTING,
    loadComponent: () => import('./examples/04-routing/routing-beispiel.component').then(m => m.RoutingBeispielComponent),
    title: 'Routing-Beispiel'
  },
  {
    path: ROUTES.OAUTH,
    loadComponent: () => import('./examples/05-oauth/oauth-beispiel.component').then(m => m.OauthBeispielComponent),
    title: 'OAuth & Authentication'
  },
  {
    path: ROUTES.STATE_MANAGEMENT,
    loadComponent: () => import('./examples/06-state-management/state-management-beispiel.component').then(m => m.StateManagementBeispielComponent),
    title: 'State Management',
    canActivate: [AuthGuard],
    data: { role: 'user' }
  },
  {
    path: ROUTES.SEPARATION,
    loadComponent: () => import('./examples/07-separation/separation-beispiel.component').then(m => m.SeparationBeispielComponent),
    title: 'Separation of Concerns'
  },
  {
    path: ROUTES.RXJS,
    loadComponent: () => import('./examples/08-rxjs/rxjs-beispiel.component').then(m => m.RxjsBeispielComponent),
    title: 'RxJS & Asynchrone Programmierung'
  },
  {
    path: ROUTES.PIPES,
    loadComponent: () => import('./examples/09-pipes/pipes-beispiel.component').then(m => m.PipesBeispielComponent),
    title: 'Pipes & Filter'
  },
  {
    path: `${ROUTES.BENUTZER}/:id`,
    loadComponent: () => import('./examples/04-routing/benutzer-detail.component').then(m => m.BenutzerDetailComponent),
    title: 'Benutzer-Details'
  },
  {
    path: '**',
    redirectTo: ROUTES.HOME
  }
];
