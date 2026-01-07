import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Auth Guard - Schützt Routen vor unbefugtem Zugriff
 * Beispiel für Route Guards
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    
    if (!isAuthenticated) {
      console.log('Zugriff verweigert - Benutzer nicht authentifiziert');
      // Umleitung zur Login-Seite
      this.router.navigate(['/oauth'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
    
    // Prüfen ob Benutzer die erforderliche Rolle hat
    const requiredRole = route.data['role'] as string;
    if (requiredRole && !this.authService.hasRole(requiredRole)) {
      console.log(`Zugriff verweigert - Rolle "${requiredRole}" erforderlich`);
      this.router.navigate(['/']);
      return false;
    }
    
    return true;
  }
}
