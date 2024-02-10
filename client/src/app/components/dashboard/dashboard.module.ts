import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

export const DashboardModules = [
  CommonModule,
  // FormsModule,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  MatButtonModule,
  MatCardModule,
];
