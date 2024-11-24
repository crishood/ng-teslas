import { Routes } from '@angular/router';
import { Step1Component } from './step1/step1.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'step1',
    pathMatch: 'full',
  },
  {
    path: 'step1',
    component: Step1Component,
  },
];
