import { Routes } from '@angular/router';
import { TablePageComponent } from './component/page/ui/table-page/table-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: 'table',
    component: TablePageComponent,
  },
];
