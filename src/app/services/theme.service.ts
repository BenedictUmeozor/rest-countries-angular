import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject: BehaviorSubject<'light' | 'dark'>;
  currentTheme$: Observable<'light' | 'dark'>;

  constructor() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    this.themeSubject = new BehaviorSubject(savedTheme || 'dark');
    this.currentTheme$ = this.themeSubject.asObservable();
  }

  setTheme(theme: 'light' | 'dark') {
    this.themeSubject.next(theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }
}
