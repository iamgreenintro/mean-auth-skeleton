import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

export const DashboardModules = [
  CommonModule,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
];
