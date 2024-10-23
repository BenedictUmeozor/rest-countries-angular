import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-theme-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './theme-button.component.html',
  styleUrl: './theme-button.component.css',
})
export class ThemeButtonComponent {
  theme: 'light' | 'dark' = 'dark';

  constructor(private themeService: ThemeService) {
    this.themeService.currentTheme$.subscribe((theme) => {
      this.theme = theme;
    });
  }

  setTheme(theme: 'light' | 'dark') {
    this.themeService.setTheme(theme);
  }
}
