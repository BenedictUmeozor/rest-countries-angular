import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Output() onSearch = new EventEmitter<string>();
  constructor() {}

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.onSearch.emit(value);
  }
}
