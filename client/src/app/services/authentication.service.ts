import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ResponseInterface } from '../interfaces/response.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly route: string = '/authentication';

  constructor(private apiService: ApiService, private router: Router) {}

  public async attemptLogin(payload: {
    username: string;
    password: string;
  }): Promise<ResponseInterface> {
    const response = await this.apiService.post(this.route, payload);
    return response;
  }

  public async checkSession(): Promise<ResponseInterface> {
    const response = await this.apiService.get(this.route + '/session');
    if (!response) {
      this.router.navigate(['/login']);
    }
    return response;
  }

  public async logout(): Promise<ResponseInterface> {
    const response = await this.apiService.post(this.route + '/logout', {});
    return response;
  }
}
