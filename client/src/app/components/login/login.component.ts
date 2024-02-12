import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModules } from './login.module';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'login',
  standalone: true,
  providers: [AuthenticationService],
  imports: [LoginModules],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';
  public isPasswordHidden: boolean = true;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  public login = async (): Promise<void> => {
    const credentials = { username: this.username, password: this.password };
    const response = await this.authenticationService.attemptLogin(credentials);

    // Authentication failed:
    if (response.error) {
      console.log(response);
    }

    // We have a user, redirect to dasboard component:
    if (response.data) {
      console.log(response.data);
      this.router.navigate(['/dashboard']);
    }
  };
}
