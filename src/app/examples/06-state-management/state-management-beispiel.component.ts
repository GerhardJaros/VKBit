import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StateService, Todo } from '../../services/state.service';

/**
 * Beispiel 6: State Management
 * Demonstriert Signals, RxJS und Redux-Patterns
 */
@Component({
  selector: 'app-state-management-beispiel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './state-management-beispiel.component.html',
  styleUrl: './state-management-beispiel.component.css'
})
export class StateManagementBeispielComponent {
  // Signals
  zaehler = signal(0);
  zaehlerVerdoppelt = computed(() => this.zaehler() * 2);
  istGerade = computed(() => this.zaehler() % 2 === 0);
  
  // RxJS
  aktuelleZeit$ = this.stateService.getCurrentTime();
  suchbegriff = '';
  suchErgebnis = '';
  
  // Redux
  todos$ = this.stateService.getTodos();
  gefilterteTodos$ = this.stateService.getFilteredTodos();
  neuesTodo = '';
  filter: 'alle' | 'offen' | 'erledigt' = 'alle';
  erledigteTodos = 0;
  offeneTodos = 0;
  
  constructor(private stateService: StateService) {
    // Effect für Zähler
    effect(() => {
      console.log('Zähler hat sich geändert:', this.zaehler());
    });
    
    // Subscribe zu Todos für Statistiken
    this.todos$.subscribe(todos => {
      this.erledigteTodos = todos.filter(t => t.erledigt).length;
      this.offeneTodos = todos.filter(t => !t.erledigt).length;
    });
  }
  
  // Signal-Methoden
  erhoeheZaehler(): void {
    this.zaehler.update(value => value + 1);
  }
  
  verringereZaehler(): void {
    this.zaehler.update(value => value - 1);
  }
  
  zuruecksetzen(): void {
    this.zaehler.set(0);
  }
  
  // RxJS-Methoden
  onSuche(begriff: string): void {
    this.stateService.search(begriff).subscribe(ergebnis => {
      this.suchErgebnis = ergebnis;
    });
  }
  
  // Redux-Methoden
  todoHinzufuegen(): void {
    if (this.neuesTodo.trim()) {
      this.stateService.addTodo(this.neuesTodo.trim());
      this.neuesTodo = '';
    }
  }
  
  todoToggle(id: number): void {
    this.stateService.toggleTodo(id);
  }
  
  todoLoeschen(id: number): void {
    this.stateService.deleteTodo(id);
  }
  
  alleLoeschen(): void {
    this.stateService.clearTodos();
  }
  
  setFilter(filter: 'alle' | 'offen' | 'erledigt'): void {
    this.filter = filter;
    this.stateService.setFilter(filter);
  }
}
