import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Kind-Komponente für Kommunikations-Beispiel
 * Demonstriert @Input, @Output und Content Projection
 */
@Component({
  selector: 'app-kind',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kind.component.html',
  styleUrl: './kind.component.css'
})
export class KindComponent implements OnChanges {
  // Input-Properties (Daten von Eltern zur Kind-Komponente)
  @Input() titel = 'Kind-Komponente';
  @Input() zaehler = 0;
  @Input() aktiv = false;
  
  // Output-Events (Daten von Kind zur Eltern-Komponente)
  @Output() nachrichtEvent = new EventEmitter<string>();
  @Output() zaehlerGeaendert = new EventEmitter<number>();
  
  // Lokale Properties
  lokalerZaehler = 0;
  
  ngOnChanges(changes: SimpleChanges): void {
    // Reagiert auf Änderungen der Input-Properties
    if (changes['zaehler']) {
      console.log(`${this.titel}: Zähler hat sich geändert von ${changes['zaehler'].previousValue} zu ${changes['zaehler'].currentValue}`);
    }
    
    if (changes['aktiv']) {
      console.log(`${this.titel}: Aktiv-Status hat sich geändert zu ${changes['aktiv'].currentValue}`);
    }
  }
  
  erhoeheLokalenZaehler(): void {
    this.lokalerZaehler++;
    // Sendet Event an Eltern-Komponente
    this.zaehlerGeaendert.emit(this.lokalerZaehler);
  }
  
  sendeNachricht(): void {
    const nachricht = `Nachricht von ${this.titel} um ${new Date().toLocaleTimeString()}`;
    // Sendet Event mit Daten an Eltern-Komponente
    this.nachrichtEvent.emit(nachricht);
  }
}
