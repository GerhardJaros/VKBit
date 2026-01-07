import { Component } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe, PercentPipe, JsonPipe } from '@angular/common';
import { TruncatePipe, FilterArrayPipe, SortByPipe, TimeAgoPipe, FileSizePipe } from '../../pipes/custom.pipes';
import { FormsModule } from '@angular/forms';

/**
 * Beispiel 9: Pipes und Filter
 * Demonstriert Built-in und Custom Pipes
 */

interface Person {
  id: number;
  name: string;
  alter: number;
  gehalt: number;
  abteilung: string;
  erstelltAm: Date;
}

@Component({
  selector: 'app-pipes-beispiel',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    DatePipe,
    CurrencyPipe,
    PercentPipe,
    JsonPipe,
    TruncatePipe,
    FilterArrayPipe,
    SortByPipe,
    TimeAgoPipe,
    FileSizePipe
  ],
  templateUrl: './pipes-beispiel.component.html',
  styleUrl: './pipes-beispiel.component.css'
})
export class PipesBeispielComponent {
  // Built-in Pipes Data
  heute = new Date();
  preis = 1234.56;
  prozent = 0.7523;
  zahl = 1234567.89;
  text = 'angular ist großartig';
  testObjekt = { name: 'Max', alter: 30, stadt: 'Berlin' };
  
  // Custom Pipes Data
  langerText = 'Dies ist ein sehr langer Text der demonstriert werden soll wie die Truncate-Pipe funktioniert';
  vor5Minuten = new Date(Date.now() - 5 * 60 * 1000);
  vor2Stunden = new Date(Date.now() - 2 * 60 * 60 * 1000);
  vor3Tagen = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
  
  // Filter & Sort Data
  suchbegriff = '';
  sortierfeld: 'name' | 'alter' | 'gehalt' | 'abteilung' = 'name';
  sortierrichtung: 'asc' | 'desc' = 'asc';
  
  personen: Person[] = [
    { 
      id: 1, 
      name: 'Anna Müller', 
      alter: 28, 
      gehalt: 45000, 
      abteilung: 'IT',
      erstelltAm: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    { 
      id: 2, 
      name: 'Max Schmidt', 
      alter: 35, 
      gehalt: 55000, 
      abteilung: 'Vertrieb',
      erstelltAm: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    { 
      id: 3, 
      name: 'Lisa Weber', 
      alter: 42, 
      gehalt: 65000, 
      abteilung: 'IT',
      erstelltAm: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    { 
      id: 4, 
      name: 'Tom Klein', 
      alter: 31, 
      gehalt: 50000, 
      abteilung: 'Marketing',
      erstelltAm: new Date(Date.now() - 10 * 60 * 1000)
    },
    { 
      id: 5, 
      name: 'Julia Becker', 
      alter: 29, 
      gehalt: 48000, 
      abteilung: 'HR',
      erstelltAm: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    { 
      id: 6, 
      name: 'Peter Wagner', 
      alter: 38, 
      gehalt: 60000, 
      abteilung: 'IT',
      erstelltAm: new Date(Date.now() - 3 * 60 * 60 * 1000)
    }
  ];
}
