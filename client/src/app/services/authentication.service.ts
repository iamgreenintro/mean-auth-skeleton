import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ResponseInterface } from '../interfaces/response.interface';
import { Router } from '@angular/router';
// import { SnackbarComponent } from '../shared/components/snackbar.component';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly route: string = '/authentication';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private snackbarService: SnackbarService // private _snackBar: MatSnackBar
  ) {}

  public async attemptLogin(payload: {
    username: string;
    password: string;
  }): Promise<ResponseInterface> {
    const response: ResponseInterface | any = await this.apiService.post(
      this.route,
      payload
    );
    if (response.error) {
      let msg = response.message;
      if (response.error.message) {
        msg = response.error.message;
      }
      this.snackbarService.displayError(msg);
    }
    return response;
  }

  public async checkSession(): Promise<ResponseInterface> {
    const response = await this.apiService.get(this.route + '/session');
    if (!response) {
      this.router.navigate(['/login']);
      this.snackbarService.displayError('Session expired.');
    }
    return response;
  }

  public async logout(): Promise<ResponseInterface> {
    const response = await this.apiService.post(this.route + '/logout', {});
    if (response === null) {
      // logout success
      this.router.navigate(['/login']);
      this.snackbarService.displaySuccess('You have been logged out.');
    }
    return response;
  }
}
