import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/ui/home-page/home-page.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'search',
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'search',
  //   component: HomePageComponent,
  // },
  // { path: 'login', component: HomePageComponent },

  {
    path: '',
    component: HomePageComponent,
  },
];
