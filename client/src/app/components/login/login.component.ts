import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModules } from './login.module';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'login',
  standalone: true,
  providers: [ApiService],
  imports: [LoginModules],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';
  public isPasswordHidden: boolean = true;

  constructor(private router: Router, private apiService: ApiService) {}

  public login = async (): Promise<void> => {
    const credentials = { username: this.username, password: this.password };
    console.log(credentials);

    const response = await this.apiService.post('/authentication', credentials);
    console.log(response);

    // Authentication failed:
    if (response.error) {
      console.error(response.message);
      return;
    }

    // We have a user, redirect to dasboard component:
    // if (response.data) {
    //   console.log(response.data);
    //   this.router.navigate(['/dashboard']);
    // }
  };
}
