import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ResponseInterface } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly route: string = '/users';

  constructor(private apiService: ApiService) {}

  public async createUser(user: {
    username: string;
    password: string;
  }): Promise<ResponseInterface> {
    const response = await this.apiService.post(this.route + '/create', user);
    return response;
  }

  public async getAllUsers(): Promise<ResponseInterface> {
    const response = await this.apiService.get(this.route);
    return response;
  }
}
