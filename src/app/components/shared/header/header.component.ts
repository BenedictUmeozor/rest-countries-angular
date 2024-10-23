import { Component } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { ThemeButtonComponent } from '../theme-button/theme-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ContainerComponent, ThemeButtonComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
