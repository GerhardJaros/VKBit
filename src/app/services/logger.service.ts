import { Injectable } from '@angular/core';

/**
 * Beispiel-Service für Dependency Injection
 * Demonstriert Singleton Pattern (providedIn: 'root')
 */
@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private logs: string[] = [];
  
  log(nachricht: string): void {
    const zeitstempel = new Date().toLocaleTimeString();
    const logEintrag = `[${zeitstempel}] ${nachricht}`;
    this.logs.push(logEintrag);
    console.log(logEintrag);
  }
  
  error(nachricht: string): void {
    const zeitstempel = new Date().toLocaleTimeString();
    const logEintrag = `[${zeitstempel}] ERROR: ${nachricht}`;
    this.logs.push(logEintrag);
    console.error(logEintrag);
  }
  
  getLogs(): string[] {
    return [...this.logs];
  }
  
  clearLogs(): void {
    this.logs = [];
  }
}
