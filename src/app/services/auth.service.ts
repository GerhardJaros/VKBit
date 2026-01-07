import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Beispiel 5: OAuth / Authentication Service
 * Demonstriert ein einfaches Berechtigungssystem
 */

export interface Benutzer {
  id: number;
  benutzername: string;
  email: string;
  rollen: string[];
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Benutzer | null>;
  public currentUser$: Observable<Benutzer | null>;
  
  // Simulierte Benutzer-Datenbank
  private benutzerDb: Map<string, { passwort: string, benutzer: Benutzer }> = new Map([
    ['admin@test.de', {
      passwort: 'admin123',
      benutzer: {
        id: 1,
        benutzername: 'Admin',
        email: 'admin@test.de',
        rollen: ['admin', 'user']
      }
    }],
    ['user@test.de', {
      passwort: 'user123',
      benutzer: {
        id: 2,
        benutzername: 'User',
        email: 'user@test.de',
        rollen: ['user']
      }
    }]
  ]);
  
  constructor() {
    // Versuche Benutzer aus localStorage zu laden
    const gespeicherterBenutzer = localStorage.getItem('currentUser');
    const initialUser = gespeicherterBenutzer ? JSON.parse(gespeicherterBenutzer) : null;
    
    this.currentUserSubject = new BehaviorSubject<Benutzer | null>(initialUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }
  
  /**
   * Login-Methode (simuliert OAuth-Flow)
   */
  login(email: string, passwort: string): Observable<Benutzer> {
    return new Observable(observer => {
      // Simuliere API-Call mit Verzögerung
      setTimeout(() => {
        const benutzerData = this.benutzerDb.get(email);
        
        if (benutzerData && benutzerData.passwort === passwort) {
          // Simuliere Token-Generierung
          const token = this.generiereToken();
          const benutzer: Benutzer = {
            ...benutzerData.benutzer,
            token
          };
          
          // Speichere Benutzer im localStorage
          localStorage.setItem('currentUser', JSON.stringify(benutzer));
          localStorage.setItem('authToken', token);
          
          this.currentUserSubject.next(benutzer);
          observer.next(benutzer);
          observer.complete();
        } else {
          observer.error({ message: 'Ungültige Anmeldedaten' });
        }
      }, 1000);
    });
  }
  
  /**
   * OAuth-Login (simuliert)
   */
  oauthLogin(provider: 'google' | 'github' | 'microsoft'): Observable<Benutzer> {
    return new Observable(observer => {
      // Simuliere OAuth-Flow
      setTimeout(() => {
        const benutzer: Benutzer = {
          id: Math.floor(Math.random() * 1000),
          benutzername: `${provider}_user`,
          email: `${provider}@example.com`,
          rollen: ['user'],
          token: this.generiereToken()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(benutzer));
        localStorage.setItem('authToken', benutzer.token!);
        
        this.currentUserSubject.next(benutzer);
        observer.next(benutzer);
        observer.complete();
      }, 1500);
    });
  }
  
  /**
   * Logout-Methode
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }
  
  /**
   * Prüft ob Benutzer authentifiziert ist
   */
  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }
  
  /**
   * Gibt den aktuellen Benutzer zurück
   */
  getCurrentUser(): Benutzer | null {
    return this.currentUserSubject.value;
  }
  
  /**
   * Prüft ob Benutzer eine bestimmte Rolle hat
   */
  hasRole(rolle: string): boolean {
    const benutzer = this.getCurrentUser();
    return benutzer ? benutzer.rollen.includes(rolle) : false;
  }
  
  /**
   * Gibt das aktuelle Auth-Token zurück
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  
  /**
   * Generiert ein simuliertes Token
   */
  private generiereToken(): string {
    return 'token_' + Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
}
