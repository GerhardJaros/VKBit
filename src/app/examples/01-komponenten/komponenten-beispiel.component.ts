import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Beispiel 1: Komponenten
 * Zeigt den Aufbau von Komponenten, Templates, Control Flow und Datenbindung
 */
@Component({
  selector: 'app-komponenten-beispiel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './komponenten-beispiel.component.html',
  styleUrl: './komponenten-beispiel.component.css'
})
export class KomponentenBeispielComponent {
  // Komponenteneigenschaften
  titel = 'Angular Komponenten-Beispiel';
  zaehler = 0;
  bildUrl = 'https://angular.io/assets/images/logos/angular/angular.svg';
  bildAlt = 'Angular Logo';
  istDeaktiviert = false;
  status: 'aktiv' | 'inaktiv' | 'wartend' = 'aktiv';
  
  items = [
    { id: 1, name: 'Item 1', beschreibung: 'Erstes Element' },
    { id: 2, name: 'Item 2', beschreibung: 'Zweites Element' },
    { id: 3, name: 'Item 3', beschreibung: 'Drittes Element' }
  ];
  
  // Komponentenmethoden
  erhoeheZaehler(): void {
    this.zaehler++;
  }
  
  verringereZaehler(): void {
    this.zaehler--;
  }
  
  berechneQuadrat(zahl: number): number {
    return zahl * zahl;
  }
  
  wechsleStatus(): void {
    if (this.status === 'aktiv') {
      this.status = 'wartend';
    } else if (this.status === 'wartend') {
      this.status = 'inaktiv';
    } else {
      this.status = 'aktiv';
    }
  }
}
