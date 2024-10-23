import { Component, Input, OnInit } from '@angular/core';
import { CountryService } from '../../../services/country.service';
import { Observable, of } from 'rxjs';
import { Country } from '../../../interfaces/country';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';

@Component({
  selector: 'app-country-borders',
  standalone: true,
  imports: [RouterLink, AsyncPipe, SkeletonComponent],
  templateUrl: './country-borders.component.html',
  styleUrl: './country-borders.component.css',
})
export class CountryBordersComponent implements OnInit {
  @Input({ required: true }) border: string | undefined;

  data$: Observable<Country[] | null> = of(null);
  loading$: Observable<boolean> = of(false);
  error$: Observable<string | null> = of(null);

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    if (this.border) {
      const result = this.countryService.getCountryByCCA(this.border);
      if (result) {
        this.data$ = result.data;
        this.loading$ = result.loading;
        this.error$ = result.error;
      }
    }
  }
}
