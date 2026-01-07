import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

/**
 * Benutzer-Detail-Komponente
 * Zeigt, wie Route-Parameter und Query-Parameter verwendet werden
 */
@Component({
  selector: 'app-benutzer-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './benutzer-detail.component.html',
  styleUrl: './benutzer-detail.component.css'
})
export class BenutzerDetailComponent implements OnInit {
  benutzerId: string | null = null;
  queryParams: any = {};
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    // Route-Parameter auslesen
    this.route.paramMap.subscribe(params => {
      this.benutzerId = params.get('id');
      console.log('Benutzer-ID:', this.benutzerId);
    });
    
    // Query-Parameter auslesen
    this.route.queryParamMap.subscribe(params => {
      this.queryParams = {};
      params.keys.forEach(key => {
        this.queryParams[key] = params.get(key);
      });
      console.log('Query-Parameter:', this.queryParams);
    });
  }
  
  getQueryParamEntries(): Array<{key: string, value: any}> {
    return Object.entries(this.queryParams).map(([key, value]) => ({ key, value }));
  }
  
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }
}
