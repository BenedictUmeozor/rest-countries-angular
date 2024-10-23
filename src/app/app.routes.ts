import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Rest Countries',
    component: HomeComponent,
  },
  {
    path: 'countries/:country',
    title: 'Rest Countries',
    component: DetailsComponent,
  },
];
