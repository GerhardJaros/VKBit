import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KindComponent } from './kind.component';

/**
 * Beispiel 3: Komponentenschnitt & Kommunikation
 * Eltern-Komponente demonstriert Input/Output und ViewChild
 */
@Component({
  selector: 'app-eltern',
  standalone: true,
  imports: [CommonModule, KindComponent],
  templateUrl: './eltern.component.html',
  styleUrl: './eltern.component.css'
})
export class ElternComponent {
  elternZaehler = 0;
  nachrichtVomKind = 'Noch keine Nachricht empfangen';
  nachrichtAnKind = 'Hallo von Eltern!';
  
  erhoeheElternZaehler(): void {
    this.elternZaehler++;
  }
  
  sendNachrichtAnKind(): void {
    this.nachrichtAnKind = `Nachricht um ${new Date().toLocaleTimeString()}`;
  }
  
  empfangeNachricht(nachricht: string): void {
    this.nachrichtVomKind = nachricht;
    console.log('Eltern hat Nachricht empfangen:', nachricht);
  }
  
  kindZaehlerGeaendert(neuerWert: number): void {
    console.log('Kind-Zähler wurde geändert auf:', neuerWert);
  }
}
