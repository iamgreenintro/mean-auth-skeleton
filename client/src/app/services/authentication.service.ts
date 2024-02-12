import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ResponseInterface } from '../interfaces/response.interface';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly route: string = '/authentication';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  public async attemptLogin(payload: {
    username: string;
    password: string;
  }): Promise<ResponseInterface> {
    const response: ResponseInterface = await this.apiService.post(
      this.route,
      payload
    );
    if (response.error) {
      this.snackbarService.displayError(response.message);
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
