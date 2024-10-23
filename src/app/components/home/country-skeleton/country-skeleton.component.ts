import { Component } from '@angular/core';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';

@Component({
  selector: 'app-country-skeleton',
  standalone: true,
  imports: [SkeletonComponent],
  templateUrl: './country-skeleton.component.html',
  styleUrl: './country-skeleton.component.css',
})
export class CountrySkeletonComponent {}
