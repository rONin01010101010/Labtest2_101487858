import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'missions', pathMatch: 'full' },
  {
    path: 'missions',
    loadComponent: () =>
      import('./missionlist/missionlist').then(m => m.Missionlist)
  },
  {
    path: 'missions/filter',
    loadComponent: () =>
      import('./missionfilter/missionfilter').then(m => m.Missionfilter)
  },
  {
    path: 'missions/:id',
    loadComponent: () =>
      import('./missiondetails/missiondetails').then(m => m.Missiondetails)
  }
];
