import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

/**
 * State Service für State Management Beispiel
 * Demonstriert Redux-Pattern und RxJS
 */

export interface Todo {
  id: number;
  titel: string;
  erledigt: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: 'alle' | 'offen' | 'erledigt';
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // Redux-Style State Management
  private stateSubject = new BehaviorSubject<TodoState>({
    todos: [
      { id: 1, titel: 'Angular lernen', erledigt: false },
      { id: 2, titel: 'Signals verstehen', erledigt: true },
      { id: 3, titel: 'RxJS meistern', erledigt: false }
    ],
    filter: 'alle'
  });
  
  private state$ = this.stateSubject.asObservable();
  private nextId = 4;
  
  // Suche mit BehaviorSubject
  private searchSubject = new BehaviorSubject<string>('');
  
  /**
   * Gibt aktuelle Zeit als Observable zurück
   */
  getCurrentTime(): Observable<string> {
    return interval(1000).pipe(
      map(() => new Date().toLocaleTimeString('de-DE'))
    );
  }
  
  /**
   * Suche mit Debounce
   */
  search(term: string): Observable<string> {
    this.searchSubject.next(term);
    
    return this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        // Simuliere API-Call
        return of(searchTerm ? `Suchergebnis für: "${searchTerm}"` : 'Keine Suche');
      })
    );
  }
  
  /**
   * Gibt alle Todos zurück
   */
  getTodos(): Observable<Todo[]> {
    return this.state$.pipe(
      map(state => state.todos)
    );
  }
  
  /**
   * Gibt gefilterte Todos zurück
   */
  getFilteredTodos(): Observable<Todo[]> {
    return this.state$.pipe(
      map(state => {
        switch (state.filter) {
          case 'offen':
            return state.todos.filter(todo => !todo.erledigt);
          case 'erledigt':
            return state.todos.filter(todo => todo.erledigt);
          default:
            return state.todos;
        }
      })
    );
  }
  
  /**
   * Fügt ein neues Todo hinzu
   */
  addTodo(titel: string): void {
    const currentState = this.stateSubject.value;
    const neuesTodo: Todo = {
      id: this.nextId++,
      titel,
      erledigt: false
    };
    
    this.stateSubject.next({
      ...currentState,
      todos: [...currentState.todos, neuesTodo]
    });
  }
  
  /**
   * Togglet den erledigt-Status eines Todos
   */
  toggleTodo(id: number): void {
    const currentState = this.stateSubject.value;
    const updatedTodos = currentState.todos.map(todo =>
      todo.id === id ? { ...todo, erledigt: !todo.erledigt } : todo
    );
    
    this.stateSubject.next({
      ...currentState,
      todos: updatedTodos
    });
  }
  
  /**
   * Löscht ein Todo
   */
  deleteTodo(id: number): void {
    const currentState = this.stateSubject.value;
    const updatedTodos = currentState.todos.filter(todo => todo.id !== id);
    
    this.stateSubject.next({
      ...currentState,
      todos: updatedTodos
    });
  }
  
  /**
   * Löscht alle Todos
   */
  clearTodos(): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      todos: []
    });
  }
  
  /**
   * Setzt den Filter
   */
  setFilter(filter: 'alle' | 'offen' | 'erledigt'): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      filter
    });
  }
}
