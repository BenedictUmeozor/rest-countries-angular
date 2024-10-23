import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../interfaces/country';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  Subject,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1';

  private dataCache: Country[] = [];

  private dataSubject = new BehaviorSubject<Country[] | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private errorSubject = new BehaviorSubject<string | null>(null);

  private searchQuerySubject = new Subject<{
    query: string;
    region?: string;
  }>();

  private dataByNameCache = new Map<string, Country[]>();

  private dataSubjectByName = new BehaviorSubject<Country[] | null>(null);
  private loadingSubjectByName = new BehaviorSubject<boolean>(true);
  private errorSubjectByName = new BehaviorSubject<string | null>(null);

  private dataByCCACache: Map<
    string,
    {
      data: Observable<Country[] | null>;
      loading: Observable<boolean>;
      error: Observable<string | null>;
    }
  > = new Map();

  private dataSubjectByCCA = new BehaviorSubject<Country[] | null>(null);
  private loadingSubjectByCCA = new BehaviorSubject<boolean>(true);
  private errorSubjectByCCA = new BehaviorSubject<string | null>(null);

  data$ = this.dataSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  dataByName$ = this.dataSubjectByName.asObservable();
  loadingByName$ = this.loadingSubjectByName.asObservable();
  errorByName$ = this.errorSubjectByName.asObservable();

  dataByCCA$ = this.dataSubjectByCCA.asObservable();
  loadingByCCA$ = this.loadingSubjectByCCA.asObservable();
  errorByCCA$ = this.errorSubjectByCCA.asObservable();

  constructor(private http: HttpClient) {
    this.searchQuerySubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.executeFilter(query);
      });
  }

  getCountries() {
    if (this.dataCache.length > 0) {
      this.dataSubject.next(this.dataCache);
      this.loadingSubject.next(false);
      return;
    }

    if (!this.dataSubject.value) {
      this.loadingSubject.next(true);
      this.errorSubject.next(null);
      this.http
        .get<Country[]>(`${this.apiUrl}/all`)
        .pipe(
          tap((countries) => {
            this.dataCache = countries;
            this.dataSubject.next(countries);
            this.loadingSubject.next(false);
          }),
          catchError((error) => {
            this.loadingSubject.next(false);
            this.errorSubject.next(
              error.message || 'Failed to fetch countries',
            );
            return of(null);
          }),
        )
        .subscribe();
    }
  }

  getCountryByName(name: string) {
    if (this.dataByNameCache.has(name)) {
      this.dataSubjectByName.next(this.dataByNameCache.get(name) ?? null);
      this.loadingSubjectByName.next(false);
      return;
    }

    this.loadingSubjectByName.next(true);
    this.errorSubjectByName.next(null);
    this.http
      .get<Country[]>(`${this.apiUrl}/name/${name}`)
      .pipe(
        tap((countries) => {
          this.dataByNameCache.set(name, countries);
          this.dataSubjectByName.next(countries);
          this.loadingSubjectByName.next(false);
        }),
        catchError((error) => {
          this.loadingSubjectByName.next(false);
          this.errorSubjectByName.next(
            error.message || 'Failed to fetch countries',
          );
          return of(null);
        }),
      )
      .subscribe();
  }

  getCountryByCCA(cca3: string):
    | {
        data: Observable<Country[] | null>;
        loading: Observable<boolean>;
        error: Observable<string | null>;
      }
    | undefined {
    if (this.dataByCCACache.has(cca3)) {
      return this.dataByCCACache.get(cca3);
    }

    const dataSubject = new BehaviorSubject<Country[] | null>(null);
    const loadingSubject = new BehaviorSubject<boolean>(true);
    const errorSubject = new BehaviorSubject<string | null>(null);

    this.http
      .get<Country[]>(`${this.apiUrl}/alpha/${cca3}`)
      .pipe(
        tap((countries) => {
          dataSubject.next(countries);
          loadingSubject.next(false);
        }),
        catchError((error) => {
          loadingSubject.next(false);
          errorSubject.next(error.message || 'Failed to fetch countries');
          return of(null);
        }),
      )
      .subscribe();

    this.dataByCCACache.set(cca3, {
      data: dataSubject.asObservable(),
      loading: loadingSubject.asObservable(),
      error: errorSubject.asObservable(),
    });

    return this.dataByCCACache.get(cca3);
  }

  filterByRegion(region: string, query?: string) {
    if (!region) {
      this.dataSubject.next(this.dataCache);
      return;
    }

    let filtered = this.dataCache.filter(
      (country) => country.region.toLowerCase() === region,
    );

    if (query) {
      filtered = filtered.filter(
        (country) =>
          country.name.common.toLowerCase().includes(query.toLowerCase()) ||
          country.name.official.toLowerCase().includes(query.toLowerCase()),
      );
    }

    this.dataSubject.next(filtered);
  }

  filterByQuery(query: string, region?: string) {
    this.searchQuerySubject.next({ query, region });
  }

  executeFilter({ query, region }: { query: string; region?: string }) {
    if (!query) {
      if (region) {
        this.filterByRegion(region);
        return;
      }
      this.dataSubject.next(this.dataCache);
      return;
    }

    let filtered = this.dataCache.filter(
      (country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase()) ||
        country.name.official.toLowerCase().includes(query.toLowerCase()),
    );

    if (region) {
      filtered = filtered.filter(
        (country) => country.region.toLowerCase() === region,
      );
    }

    this.dataSubject.next(filtered);
  }
}
