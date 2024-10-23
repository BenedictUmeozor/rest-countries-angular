import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../components/shared/container/container.component';
import { SearchComponent } from '../../components/home/search/search.component';
import { SelectComponent } from '../../components/home/select/select.component';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';
import { filter, map, Observable } from 'rxjs';
import { CountrySkeletonComponent } from '../../components/home/country-skeleton/country-skeleton.component';
import { CountryComponent } from '../../components/shared/country/country.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ContainerComponent,
    SearchComponent,
    SelectComponent,
    CountrySkeletonComponent,
    CountryComponent,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  regions: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  data$: Observable<Country[] | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  private region: string | null = null;
  private query: string | null = null;

  constructor(private countryService: CountryService) {
    this.data$ = countryService.data$;
    this.loading$ = countryService.loading$;
    this.error$ = countryService.error$;
  }

  ngOnInit(): void {
    this.countryService.getCountries();
  }

  filterByRegion(value: string) {
    this.region = value;
    this.countryService.filterByRegion(value, this.query ?? '');
  }

  filterByQuery(value: string) {
    this.query = value;
    this.countryService.filterByQuery(value, this.region ?? '');
  }
}
