import { Injectable } from '@angular/core';
import { SnackbarComponent } from '../shared/components/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  public displayError(message: string): void {
    this._snackBar.openFromComponent(SnackbarComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 4000,
      data: {
        type: 'error',
        message: message,
        button: 'dismiss',
      },
    });
  }

  public displaySuccess(message: string): void {
    this._snackBar.openFromComponent(SnackbarComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 4000,
      data: {
        type: 'success',
        message: message,
        button: 'dismiss',
      },
    });
  }
}
