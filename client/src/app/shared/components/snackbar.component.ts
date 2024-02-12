import { Component, inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'snackbar',
  templateUrl: 'snackbar.component.html',
  styles: [
    `
      :host {
        display: flex;
      }

      .example-pizza-party {
        color: hotpink;
      }
    `,
  ],
  standalone: true,
  imports: [
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
  ],
})
export class PizzaPartyAnnotatedComponent {
  snackBarRef = inject(MatSnackBarRef);

  constructor() {
    console.log(this.snackBarRef);
  }
}
