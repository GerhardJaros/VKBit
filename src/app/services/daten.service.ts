import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

/**
 * Daten-Service für Dependency Injection Beispiel
 */

export interface Produkt {
  id: number;
  name: string;
  preis: number;
  kategorie: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatenService {
  private produkte: Produkt[] = [
    { id: 1, name: 'Laptop', preis: 999.99, kategorie: 'Elektronik' },
    { id: 2, name: 'Maus', preis: 29.99, kategorie: 'Elektronik' },
    { id: 3, name: 'Tastatur', preis: 79.99, kategorie: 'Elektronik' },
    { id: 4, name: 'Monitor', preis: 299.99, kategorie: 'Elektronik' },
    { id: 5, name: 'Buch', preis: 19.99, kategorie: 'Bücher' }
  ];
  
  /**
   * Gibt alle Produkte zurück (simuliert API-Call)
   */
  getProdukte(): Observable<Produkt[]> {
    return of(this.produkte).pipe(
      delay(500) // Simuliere Netzwerk-Latenz
    );
  }
  
  /**
   * Gibt ein Produkt nach ID zurück
   */
  getProdukt(id: number): Observable<Produkt> {
    const produkt = this.produkte.find(p => p.id === id);
    
    if (produkt) {
      return of(produkt).pipe(delay(300));
    } else {
      return throwError(() => new Error(`Produkt mit ID ${id} nicht gefunden`));
    }
  }
  
  /**
   * Fügt ein neues Produkt hinzu
   */
  addProdukt(produkt: Omit<Produkt, 'id'>): Observable<Produkt> {
    const neueId = Math.max(...this.produkte.map(p => p.id)) + 1;
    const neuesProdukt: Produkt = {
      ...produkt,
      id: neueId
    };
    
    this.produkte.push(neuesProdukt);
    return of(neuesProdukt).pipe(delay(300));
  }
}
