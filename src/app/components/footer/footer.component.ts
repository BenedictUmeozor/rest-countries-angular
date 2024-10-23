import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  date: string | undefined;

  constructor() {
    this.date = new Date().getFullYear().toString();
  }
}
