import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseInterface } from '../interfaces/response.interface';
import { environment } from '../../config/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly BASE: string = `${environment.apiUrl}`; // url to target our server
  private readonly ROOT_URL: string;

  constructor(private http: HttpClient) {
    this.ROOT_URL = this.BASE + '/api';
  }

  async get(route: string) {
    return await this.sendRequest('GET', route);
  }

  async post(route: string, payload: Object) {
    return await this.sendRequest('POST', route, payload);
  }

  async patch(route: string, payload: Object) {
    return await this.sendRequest('PATCH', route, payload);
  }

  async delete(route: string) {
    return await this.sendRequest('DELETE', route);
  }

  private sendRequest(
    method: string,
    route: string,
    payload?: unknown
  ): Promise<ResponseInterface> {
    return new Promise((resolve) => {
      let observable: Observable<unknown>;
      switch (method) {
        case 'GET':
          observable = this.http.get(`${this.ROOT_URL}${route}`, {
            withCredentials: true,
          });
          break;
        case 'POST':
          observable = this.http.post(`${this.ROOT_URL}${route}`, payload, {
            withCredentials: true,
          });
          break;
        case 'PATCH':
          observable = this.http.patch(`${this.ROOT_URL}${route}`, payload, {
            withCredentials: true,
          });
          break;
        case 'DELETE':
          observable = this.http.delete(`${this.ROOT_URL}${route}`, {
            withCredentials: true,
          });
          break;
        default:
          throw Error(`Request method [${method}] not supported.`);
      }

      observable.subscribe({
        next: (res) => {
          // Resolve if success:
          resolve(res as ResponseInterface);
        },
        error: (err) => {
          // Resolve if error:
          resolve(err);
        },
        complete: () => {
          // Request completed, did not hit an error either.
          // We can add logic here if needed later on.
        },
      });
    });
  }
}
