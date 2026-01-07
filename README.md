# Angular Schulungs-Applikation

Eine umfassende Angular-Schulungsapplikation mit praktischen Beispielen für alle wichtigen Angular-Konzepte.

## 🚀 Features

- ✨ **Modern**: Angular 17+ mit Standalone Components, Signals und neuer Control Flow Syntax
- 📚 **Umfassend**: Alle wichtigen Themen von Basics bis Advanced
- 💻 **Praxisnah**: Interaktive Beispiele mit echtem Code
- 🎯 **Strukturiert**: Klare Gliederung und Best Practices

## 📋 Schulungsinhalte

### Auffrischung & Vertiefung

#### 1. Komponenten
- Aufbau von Komponenten
- Templates und Template Syntax
- Control Flow (@if, @for, @switch)
- Datenbindung (Interpolation, Property Binding, Event Binding)

#### 2. Formulare
- Reactive Forms
- Template-Driven Forms
- Two-Way-Data-Binding [(ngModel)]
- Template-Reference-Variablen
- Formularvalidierung

### Neue Themenbereiche

#### 3. Komponentenschnitt & Kommunikation
- @Input und @Output
- EventEmitter
- ViewChild und ContentChild
- Content Projection (ng-content)

#### 4. Routing
- Route-Konfiguration
- Guards (CanActivate)
- Zentrale Route-Definitionen (Route Constants)
- Programmatische Navigation
- Route-Parameter und Query-Parameter
- Lazy Loading

#### 5. OAuth & Authentication
- Login/Logout-Funktionalität
- OAuth-Provider (Google, GitHub, Microsoft)
- Token-Management
- Rollen und Berechtigungen
- Guards für geschützte Routen

#### 6. State Management
- **Signals** (Angular 16+)
  - signal(), computed(), effect()
  - Reaktive State-Verwaltung
- **RxJS Streams**
  - BehaviorSubject, Observable
  - Operatoren (map, filter, debounceTime)
- **Redux Pattern**
  - Single Source of Truth
  - Immutable State Updates
  - Actions und Reducers

#### 7. Separation of Concerns
- Dependency Injection
- Services erstellen und verwenden
- Service Scopes (providedIn: 'root', Component-Level)
- Best Practices für Service-Architektur

#### 8. Asynchrone Programmierung mit RxJS
- Observables und Observers
- RxJS-Operatoren
  - map, filter, tap
  - switchMap, mergeMap, concatMap
  - debounceTime, distinctUntilChanged
  - catchError, retry
- HttpClient für API-Zugriffe
- Subscription Management
- takeUntil Pattern

#### 9. Pipes und Filter
- Built-in Pipes (date, currency, percent, etc.)
- Custom Pipes erstellen
- Pure vs. Impure Pipes
- Filter- und Sort-Pipes
- Pipe-Verkettung

## 🛠️ Installation

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
ng serve

# Im Browser öffnen
http://localhost:4200
```

## 📁 Projektstruktur

```
src/app/
├── examples/
│   ├── 01-komponenten/          # Komponenten-Beispiele
│   ├── 02-formulare/             # Formular-Beispiele
│   ├── 03-kommunikation/         # Komponenten-Kommunikation
│   ├── 04-routing/               # Routing-Beispiele
│   ├── 05-oauth/                 # OAuth & Authentication
│   ├── 06-state-management/      # State Management
│   ├── 07-separation/            # Dependency Injection
│   ├── 08-rxjs/                  # RxJS-Beispiele
│   └── 09-pipes/                 # Pipes & Filter
├── services/
│   ├── auth.service.ts           # Authentication Service
│   ├── state.service.ts          # State Management Service
│   ├── logger.service.ts         # Logger Service
│   └── daten.service.ts          # Daten Service
├── guards/
│   └── auth.guard.ts             # Authentication Guard
├── pipes/
│   └── custom.pipes.ts           # Custom Pipes
├── home/
│   └── home.component.ts         # Home-Komponente
├── app.component.ts              # Haupt-Komponente
├── app.routes.ts                 # Route-Konfiguration
└── routes.constants.ts           # Route-Konstanten
```

## 🎓 Verwendung

### Navigation

Die Anwendung verfügt über eine Navigationsleiste mit Links zu allen Schulungsthemen. Klicken Sie auf ein Thema, um die entsprechenden Beispiele anzuzeigen.

### Geschützte Routen

Das **State Management**-Beispiel ist durch einen Auth Guard geschützt. Um darauf zuzugreifen:

1. Navigieren Sie zu "OAuth"
2. Melden Sie sich mit einem der Testbenutzer an:
   - **Admin**: `admin@test.de` / `admin123`
   - **User**: `user@test.de` / `user123`
3. Nach erfolgreicher Anmeldung können Sie auf alle geschützten Bereiche zugreifen

### Interaktive Beispiele

Jede Beispielkomponente enthält:
- **Live-Demos**: Interaktive Elemente zum Ausprobieren
- **Code-Snippets**: Inline-Code-Beispiele
- **Erklärungen**: Detaillierte Beschreibungen der Konzepte
- **Best Practices**: Empfohlene Vorgehensweisen

## 🔑 Wichtige Konzepte

### Standalone Components

Diese Anwendung verwendet durchgängig Standalone Components (Angular 14+):

```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, FormsModule],
  // ...
})
```

### Signals (Angular 16+)

Moderne reaktive State-Verwaltung:

```typescript
count = signal(0);
doubled = computed(() => this.count() * 2);
```

### Control Flow (Angular 17+)

Neue Template-Syntax:

```html
@if (condition) {
  <p>Inhalt</p>
} @else {
  <p>Alternativer Inhalt</p>
}

@for (item of items; track item.id) {
  <li>{{ item.name }}</li>
}
```

### Route Constants

Typsichere Routing ohne "Magic Strings":

```typescript
export const ROUTES = {
  HOME: '',
  KOMPONENTEN: 'komponenten',
  // ...
} as const;
```

## 📚 Weiterführende Ressourcen

- [Angular Dokumentation](https://angular.io/docs)
- [RxJS Dokumentation](https://rxjs.dev/)
- [Angular Style Guide](https://angular.io/guide/styleguide)

## 🤝 Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## 📄 Lizenz

MIT License

---

**Viel Erfolg bei der Schulung!** 🎉
