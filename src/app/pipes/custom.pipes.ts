import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom Pipe: Wandelt Text in Großbuchstaben um
 */
@Pipe({
  name: 'uppercase',
  standalone: true
})
export class UppercasePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.toUpperCase() : '';
  }
}

/**
 * Custom Pipe: Kürzt Text auf eine bestimmte Länge
 */
@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20, ellipsis: string = '...'): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + ellipsis : value;
  }
}

/**
 * Custom Pipe: Filtert ein Array
 */
@Pipe({
  name: 'filterArray',
  standalone: true
})
export class FilterArrayPipe implements PipeTransform {
  transform<T>(items: T[], searchText: string, property?: keyof T): T[] {
    if (!items) return [];
    if (!searchText) return items;
    
    searchText = searchText.toLowerCase();
    
    return items.filter(item => {
      if (property) {
        const value = item[property];
        return String(value).toLowerCase().includes(searchText);
      } else {
        return String(item).toLowerCase().includes(searchText);
      }
    });
  }
}

/**
 * Custom Pipe: Sortiert ein Array
 */
@Pipe({
  name: 'sortBy',
  standalone: true
})
export class SortByPipe implements PipeTransform {
  transform<T>(array: T[], field: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
    if (!array || array.length === 0) return [];
    
    const sorted = [...array].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      
      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
    
    return sorted;
  }
}

/**
 * Custom Pipe: Formatiert Zeitstempel als "vor X Minuten"
 */
@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string): string {
    if (!value) return '';
    
    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'gerade eben';
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `vor ${minutes} Minute${minutes !== 1 ? 'n' : ''}`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `vor ${hours} Stunde${hours !== 1 ? 'n' : ''}`;
    
    const days = Math.floor(hours / 24);
    if (days < 30) return `vor ${days} Tag${days !== 1 ? 'en' : ''}`;
    
    const months = Math.floor(days / 30);
    if (months < 12) return `vor ${months} Monat${months !== 1 ? 'en' : ''}`;
    
    const years = Math.floor(months / 12);
    return `vor ${years} Jahr${years !== 1 ? 'en' : ''}`;
  }
}

/**
 * Custom Pipe: Formatiert Dateigröße
 */
@Pipe({
  name: 'fileSize',
  standalone: true
})
export class FileSizePipe implements PipeTransform {
  transform(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  }
}
