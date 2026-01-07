import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

/**
 * Beispiel 2: Datenbindung und Formulare
 * Zeigt Reactive Forms, Two-Way-Data-Binding, Template-Reference-Variablen und Validierung
 */
@Component({
  selector: 'app-formulare-beispiel',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './formulare-beispiel.component.html',
  styleUrl: './formulare-beispiel.component.css'
})
export class FormulareBeispielComponent {
  // Template-Driven Form
  benutzerName = '';
  suchbegriff = '';
  
  // Reactive Form
  registrierungForm: FormGroup;
  formSubmitted = false;
  submittedData: any = null;
  
  constructor(private fb: FormBuilder) {
    this.registrierungForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwort: ['', [Validators.required, Validators.minLength(8)]],
      alter: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      land: ['', Validators.required],
      agbAkzeptiert: [false, Validators.requiredTrue]
    });
  }
  
  // Getter für einfachen Zugriff auf Form Controls
  get email() {
    return this.registrierungForm.get('email');
  }
  
  get passwort() {
    return this.registrierungForm.get('passwort');
  }
  
  get alter() {
    return this.registrierungForm.get('alter');
  }
  
  get agbAkzeptiert() {
    return this.registrierungForm.get('agbAkzeptiert');
  }
  
  onSubmit(): void {
    if (this.registrierungForm.valid) {
      this.submittedData = this.registrierungForm.value;
      this.formSubmitted = true;
      console.log('Form submitted:', this.submittedData);
    }
  }
  
  resetForm(): void {
    this.registrierungForm.reset();
    this.formSubmitted = false;
    this.submittedData = null;
  }
  
  suchen(begriff: string): void {
    this.suchbegriff = begriff;
    console.log('Suche nach:', begriff);
  }
}
