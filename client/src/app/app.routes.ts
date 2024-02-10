import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Order matters: https://angular.dev/guide/routing/common-router-tasks#route-order
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // base url redirects to `login`
  // Components here:
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '*', component: LoginComponent }, // redirect to login
  { path: '**', redirectTo: '/page-not-found' }, // redirect to 404 handler page
];
