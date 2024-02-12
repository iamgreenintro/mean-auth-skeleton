import { Component, inject } from '@angular/core';
import { SnackbarModules } from './snackbar.module';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'snackbar',
  templateUrl: 'snackbar.component.html',
  styleUrl: './snackbar.component.scss',
  standalone: true,
  imports: [
    SnackbarModules,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
  ],
})
export class SnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);
  data = inject(MAT_SNACK_BAR_DATA);

  constructor() {
    // console.log(this.data);
  }
}
