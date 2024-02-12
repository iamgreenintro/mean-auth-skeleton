import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModules } from './login.module';
import { AuthenticationService } from '../../services/authentication.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PizzaPartyAnnotatedComponent } from '../../shared/components/snackbar.component';

@Component({
  selector: 'login',
  standalone: true,
  providers: [AuthenticationService],
  imports: [LoginModules, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';
  public isPasswordHidden: boolean = true;
  durationInSeconds = 5;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar
  ) {}

  public login = async (): Promise<void> => {
    const credentials = { username: this.username, password: this.password };
    const response: any = await this.authenticationService.attemptLogin(
      credentials
    );
    // console.log(response);

    // Authentication failed:
    if (response.error) {
      console.error(response.message);
      if (response.error.message) this.openSnackBar(response.error.message);
      return;
    }

    // We have a user, redirect to dasboard component:
    if (response.data) {
      console.log(response.data);
      this.router.navigate(['/dashboard']);
    }
  };

  public getSession = async (): Promise<void> => {
    const response = await this.authenticationService.checkSession();
    console.log(response);
  };

  public logout = async (): Promise<void> => {
    const response = await this.authenticationService.logout();
    console.log(response);
  };

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data: {
        hello: 'hello from data snackbar',
      },
    });
    // this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
    //   duration: this.durationInSeconds * 1000,
    // });
  }
}
