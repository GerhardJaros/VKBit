import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, Subject, interval, of, throwError, concat, merge, forkJoin } from 'rxjs';
import { 
  map, 
  filter, 
  debounceTime, 
  distinctUntilChanged,
  switchMap,
  mergeMap,
  concatMap,
  catchError,
  retry,
  tap,
  take,
  takeUntil,
  delay
} from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

/**
 * Beispiel 8: Asynchrone Programmierung mit RxJS
 * Demonstriert Observables, Operatoren und HttpClient
 */

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-rxjs-beispiel',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './rxjs-beispiel.component.html',
  styleUrl: './rxjs-beispiel.component.css'
})
export class RxjsBeispielComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private suchSubject = new Subject<string>();
  
  intervalWert = 0;
  ergebnis = '';
  suchbegriff = '';
  suchErgebnis = '';
  operatorErgebnis = '';
  kombinationsErgebnis = '';
  post: Post | null = null;
  posts: Post[] = [];
  laedt = false;
  fehler = '';
  
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    // Setup für Suche mit debounceTime
    this.suchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(begriff => {
      this.suchErgebnis = begriff || '(leer)';
    });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  // Interval Beispiel
  startInterval(): void {
    interval(1000).pipe(
      take(10),
      takeUntil(this.destroy$),
      tap(wert => console.log('Interval:', wert))
    ).subscribe(wert => {
      this.intervalWert = wert;
    });
  }
  
  stopInterval(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$ = new Subject<void>();
  }
  
  // Simple Observable
  simpleObservable(): void {
    of(1, 2, 3, 4, 5).pipe(
      takeUntil(this.destroy$)
    ).subscribe(wert => {
      this.ergebnis = `Wert: ${wert}`;
    });
  }
  
  // Observable mit map
  observableMitTransformation(): void {
    of(1, 2, 3, 4, 5).pipe(
      map(x => x * 2),
      takeUntil(this.destroy$)
    ).subscribe(wert => {
      this.ergebnis = `Verdoppelt: ${wert}`;
    });
  }
  
  // Observable mit filter
  observableMitFilter(): void {
    of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
      filter(x => x % 2 === 0),
      takeUntil(this.destroy$)
    ).subscribe({
      next: wert => this.ergebnis = `Gerade Zahl: ${wert}`,
      complete: () => this.ergebnis += ' (Fertig)'
    });
  }
  
  // Observable mit Fehlerbehandlung
  observableMitFehlerbehandlung(): void {
    throwError(() => new Error('Dies ist ein Test-Fehler')).pipe(
      catchError(err => {
        console.error('Fehler abgefangen:', err);
        return of('Fehler wurde behandelt!');
      }),
      takeUntil(this.destroy$)
    ).subscribe(wert => {
      this.ergebnis = wert;
    });
  }
  
  // Suche
  onSucheChange(begriff: string): void {
    this.suchSubject.next(begriff);
  }
  
  // switchMap Demo
  demonstriereSwitchMap(): void {
    of(1, 2, 3).pipe(
      switchMap(val => of(`switchMap: ${val}`).pipe(delay(1000))),
      takeUntil(this.destroy$)
    ).subscribe(result => {
      this.operatorErgebnis = result;
    });
  }
  
  // mergeMap Demo
  demonstriereMergeMap(): void {
    of(1, 2, 3).pipe(
      mergeMap(val => of(`mergeMap: ${val}`).pipe(delay(500))),
      takeUntil(this.destroy$)
    ).subscribe(result => {
      this.operatorErgebnis = result;
    });
  }
  
  // concatMap Demo
  demonstriereConcatMap(): void {
    of(1, 2, 3).pipe(
      concatMap(val => of(`concatMap: ${val}`).pipe(delay(500))),
      takeUntil(this.destroy$)
    ).subscribe(result => {
      this.operatorErgebnis = result;
    });
  }
  
  // concat Demo
  demonstriereConcat(): void {
    const obs1$ = of('Erste').pipe(delay(500));
    const obs2$ = of('Zweite').pipe(delay(500));
    const obs3$ = of('Dritte').pipe(delay(500));
    
    concat(obs1$, obs2$, obs3$).pipe(
      takeUntil(this.destroy$)
    ).subscribe(result => {
      this.kombinationsErgebnis = `concat: ${result}`;
    });
  }
  
  // merge Demo
  demonstriereMerge(): void {
    const obs1$ = of('A').pipe(delay(1000));
    const obs2$ = of('B').pipe(delay(500));
    const obs3$ = of('C').pipe(delay(1500));
    
    merge(obs1$, obs2$, obs3$).pipe(
      takeUntil(this.destroy$)
    ).subscribe(result => {
      this.kombinationsErgebnis = `merge: ${result}`;
    });
  }
  
  // forkJoin Demo
  demonstriereForkJoin(): void {
    const obs1$ = of('X').pipe(delay(500));
    const obs2$ = of('Y').pipe(delay(1000));
    const obs3$ = of('Z').pipe(delay(700));
    
    forkJoin([obs1$, obs2$, obs3$]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(results => {
      this.kombinationsErgebnis = `forkJoin: [${results.join(', ')}]`;
    });
  }
  
  // HTTP Get
  ladePost(): void {
    this.laedt = true;
    this.fehler = '';
    
    this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/1').pipe(
      retry(2),
      catchError(err => {
        console.error('Fehler beim Laden:', err);
        return throwError(() => new Error('Post konnte nicht geladen werden'));
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (post) => {
        this.post = post;
        this.laedt = false;
      },
      error: (err) => {
        this.fehler = err.message;
        this.laedt = false;
      }
    });
  }
  
  // Multiple HTTP Requests
  ladeMultiplePosts(): void {
    this.laedt = true;
    this.fehler = '';
    
    const post1$ = this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/1');
    const post2$ = this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/2');
    const post3$ = this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/3');
    
    forkJoin([post1$, post2$, post3$]).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (posts) => {
        this.posts = posts;
        this.laedt = false;
      },
      error: (err) => {
        this.fehler = 'Fehler beim Laden mehrerer Posts';
        this.laedt = false;
      }
    });
  }
  
  // Fehler simulieren
  simuliereFehler(): void {
    this.laedt = true;
    this.fehler = '';
    
    this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/99999').pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (post) => {
        this.post = post;
        this.laedt = false;
      },
      error: (err) => {
        this.fehler = 'HTTP-Fehler: Post nicht gefunden (404)';
        this.laedt = false;
      }
    });
  }
}
