import { Component, Input } from '@angular/core';
import { Country } from '../../../interfaces/country';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css',
})
export class CountryComponent {
  @Input({ required: true }) country: Country | undefined;
}
