import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ROUTES } from '../routes.constants';
import { AuthService, Benutzer } from '../services/auth.service';

/**
 * Home-Komponente
 * Übersicht über alle Schulungsthemen
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  ROUTES = ROUTES;
  istAngemeldet = false;
  benutzer: Benutzer | null = null;
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser$.subscribe(benutzer => {
      this.istAngemeldet = benutzer !== null;
      this.benutzer = benutzer;
    });
  }
  
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
  
  logout(): void {
    this.authService.logout();
  }
}
