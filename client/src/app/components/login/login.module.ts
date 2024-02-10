import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export const LoginModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
];
