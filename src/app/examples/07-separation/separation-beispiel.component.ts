import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from '../../services/logger.service';
import { DatenService, Produkt } from '../../services/daten.service';

/**
 * Beispiel 7: Separation of Concerns
 * Demonstriert Dependency Injection, Services und Scopes
 */
@Component({
  selector: 'app-separation-beispiel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './separation-beispiel.component.html',
  styleUrl: './separation-beispiel.component.css'
})
export class SeparationBeispielComponent implements OnInit {
  logs: string[] = [];
  zeigeLogs = false;
  produkte: Produkt[] = [];
  laedt = false;
  fehler = '';
  
  constructor(
    private loggerService: LoggerService,
    private datenService: DatenService
  ) {
    this.loggerService.log('SeparationBeispielComponent wurde erstellt');
  }
  
  ngOnInit(): void {
    this.loggerService.log('SeparationBeispielComponent wurde initialisiert');
  }
  
  loggeMeldung(): void {
    this.loggerService.log('Dies ist eine Test-Meldung');
    this.logs = this.loggerService.getLogs();
    this.zeigeLogs = true;
  }
  
  loggeError(): void {
    this.loggerService.error('Dies ist ein Test-Fehler');
    this.logs = this.loggerService.getLogs();
    this.zeigeLogs = true;
  }
  
  logsAnzeigen(): void {
    this.logs = this.loggerService.getLogs();
    this.zeigeLogs = true;
  }
  
  logsLoeschen(): void {
    this.loggerService.clearLogs();
    this.logs = [];
    this.zeigeLogs = false;
    this.loggerService.log('Logs wurden gelöscht');
  }
  
  ladeProdukte(): void {
    this.laedt = true;
    this.fehler = '';
    this.loggerService.log('Lade Produkte...');
    
    this.datenService.getProdukte().subscribe({
      next: (produkte) => {
        this.produkte = produkte;
        this.laedt = false;
        this.loggerService.log(`${produkte.length} Produkte geladen`);
      },
      error: (error) => {
        this.fehler = error.message;
        this.laedt = false;
        this.loggerService.error(`Fehler beim Laden der Produkte: ${error.message}`);
      }
    });
  }
}
