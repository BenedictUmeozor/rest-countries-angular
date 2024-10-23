import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../components/shared/container/container.component';
import { PageSkeletonComponent } from '../../components/details/page-skeleton/page-skeleton.component';
import { AsyncPipe } from '@angular/common';
import { CountryDetailsComponent } from '../../components/details/country-details/country-details.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    ContainerComponent,
    PageSkeletonComponent,
    AsyncPipe,
    CountryDetailsComponent,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private destroy$ = new Subject<void>();
  route: ActivatedRoute = inject(ActivatedRoute);
  data$: Observable<Country[] | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private countryService: CountryService) {
    this.data$ = this.countryService.dataByName$;
    this.loading$ = this.countryService.loadingByName$;
    this.error$ = this.countryService.errorByName$;
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.countryService.getCountryByName(params['country']);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
