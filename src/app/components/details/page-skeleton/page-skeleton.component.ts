import { Component } from '@angular/core';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';

@Component({
  selector: 'app-page-skeleton',
  standalone: true,
  imports: [SkeletonComponent],
  templateUrl: './page-skeleton.component.html',
  styleUrl: './page-skeleton.component.css',
})
export class PageSkeletonComponent {}
