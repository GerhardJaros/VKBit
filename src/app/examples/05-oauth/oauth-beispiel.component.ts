import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Benutzer } from '../../services/auth.service';

/**
 * Beispiel 5: OAuth-Komponente
 * Demonstriert ein Berechtigungssystem mit Login/Logout
 */
@Component({
  selector: 'app-oauth-beispiel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './oauth-beispiel.component.html',
  styleUrl: './oauth-beispiel.component.css'
})
export class OauthBeispielComponent {
  email = '';
  passwort = '';
  fehlerNachricht = '';
  laedt = false;
  istAngemeldet = false;
  aktuellerBenutzer: Benutzer | null = null;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Prüfe ob Benutzer bereits angemeldet ist
    this.authService.currentUser$.subscribe(benutzer => {
      this.istAngemeldet = benutzer !== null;
      this.aktuellerBenutzer = benutzer;
    });
  }
  
  get hatAdminRolle(): boolean {
    return this.authService.hasRole('admin');
  }
  
  get hatUserRolle(): boolean {
    return this.authService.hasRole('user');
  }
  
  login(): void {
    this.fehlerNachricht = '';
    this.laedt = true;
    
    this.authService.login(this.email, this.passwort).subscribe({
      next: (benutzer) => {
        console.log('Login erfolgreich:', benutzer);
        this.laedt = false;
      },
      error: (error) => {
        this.fehlerNachricht = error.message;
        this.laedt = false;
      }
    });
  }
  
  oauthLogin(provider: 'google' | 'github' | 'microsoft'): void {
    this.laedt = true;
    
    this.authService.oauthLogin(provider).subscribe({
      next: (benutzer) => {
        console.log(`${provider} Login erfolgreich:`, benutzer);
        this.laedt = false;
      },
      error: (error) => {
        this.fehlerNachricht = `${provider} Login fehlgeschlagen`;
        this.laedt = false;
      }
    });
  }
  
  logout(): void {
    this.authService.logout();
    this.email = '';
    this.passwort = '';
  }
}
