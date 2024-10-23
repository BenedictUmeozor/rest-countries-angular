import { Component, Input } from '@angular/core';
import { Country } from '../../../interfaces/country';
import { CountryBordersComponent } from '../country-borders/country-borders.component';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [CountryBordersComponent],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.css',
})
export class CountryDetailsComponent {
  @Input({ required: true }) country: Country | undefined;

  constructor() {}

  serializeCurrency() {
    if (this.country) {
      return Object.keys(this.country.currencies)
        .map(
          (key) =>
            `${this.country?.currencies[key].name} (${this.country?.currencies[key].symbol})`,
        )
        .join(', ');
    }
    return '';
  }

  serializeLanguages() {
    if (this.country) {
      return Object.values(this.country.languages).join(', ');
    }
    return '';
  }
}
