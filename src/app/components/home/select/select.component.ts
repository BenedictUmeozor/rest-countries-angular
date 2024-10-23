import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent {
  @Input() regions: string[] = [];
  @Output() onSelectChange = new EventEmitter<string>();
  region: string = '';

  hidden = true;

  constructor() {}

  toggle() {
    this.hidden = !this.hidden;
  }

  selectRegion(value: string) {
    this.region = value === this.region ? '' : value;
    this.hidden = true;
    this.onSelectChange.emit(this.region);
  }
}
