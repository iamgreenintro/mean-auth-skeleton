import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ResponseInterface } from '../interfaces/response.interface';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly route: string = '/users';

  constructor(
    private apiService: ApiService,
    private snackbarService: SnackbarService
  ) {}

  public async createUser(user: {
    username: string;
    password: string;
  }): Promise<ResponseInterface> {
    const response: ResponseInterface = await this.apiService.post(
      this.route + '/create',
      user
    );
    if (response.error) {
      this.snackbarService.displayError(response.message);
    }
    return response;
  }

  public async getAllUsers(): Promise<ResponseInterface> {
    const response = await this.apiService.get(this.route);
    if (response.error) {
      this.snackbarService.displayError(response.message);
    }
    return response;
  }
}
