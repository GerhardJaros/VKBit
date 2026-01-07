import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

/**
 * Beispiel 4: Routing
 * Demonstriert Navigation, Route-Parameter und programmatisches Routing
 */
@Component({
  selector: 'app-routing-beispiel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './routing-beispiel.component.html',
  styleUrl: './routing-beispiel.component.css'
})
export class RoutingBeispielComponent {
  aktuelleUrl = '';
  routePfad = '';
  
  routeConstantsExample = `// routes.constants.ts
export const ROUTES = {
  HOME: '/',
  KOMPONENTEN: '/komponenten',
  FORMULARE: '/formulare',
  BENUTZER: '/benutzer',
  BENUTZER_DETAILS: (id: number) => \`/benutzer/\${id}\`
} as const;

// Verwendung:
this.router.navigate([ROUTES.KOMPONENTEN]);
this.router.navigate([ROUTES.BENUTZER_DETAILS(123)]);`;
  
  constructor(private router: Router) {
    this.updateRouteInfo();
  }
  
  updateRouteInfo(): void {
    this.aktuelleUrl = this.router.url;
    this.routePfad = this.router.url.split('?')[0];
  }
  
  navigiereZuKomponenten(): void {
    this.router.navigate(['/komponenten'])
      .then(() => this.updateRouteInfo());
  }
  
  navigiereZuBenutzer(id: number): void {
    this.router.navigate(['/benutzer', id])
      .then(() => this.updateRouteInfo());
  }
  
  navigiereMitQueryParams(): void {
    this.router.navigate(['/formulare'], {
      queryParams: {
        mode: 'edit',
        id: '123',
        tab: 'settings'
      }
    }).then(() => this.updateRouteInfo());
  }
  
  navigiereMitConstant(): void {
    // Beispiel mit Route-Konstante
    const ROUTES = {
      KOMPONENTEN: '/komponenten'
    };
    this.router.navigate([ROUTES.KOMPONENTEN])
      .then(() => this.updateRouteInfo());
  }
  
  navigiereZurueck(): void {
    window.history.back();
  }
  
  navigiereVorwaerts(): void {
    window.history.forward();
  }
  
  relativeNavigation(path: string): void {
    this.router.navigate([path], { relativeTo: this.router.routerState.root })
      .then(() => this.updateRouteInfo())
      .catch(err => console.log('Navigation fehlgeschlagen:', err));
  }
}
