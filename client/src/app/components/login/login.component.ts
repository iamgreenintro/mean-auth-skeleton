import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModules } from './login.module';
import { AuthenticationService } from '../../services/authentication.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'login',
  standalone: true,
  providers: [AuthenticationService],
  imports: [LoginModules],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public username: string = '';
  public password: string = '';
  public isPasswordHidden: boolean = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private authenticationService: AuthenticationService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Set class to apply specific styling (this is to be done in login and register component).
    this.renderer.addClass(
      this.document.querySelector('app-root'),
      'login-register'
    );
  }

  public login = async (): Promise<void> => {
    const credentials = { username: this.username, password: this.password };
    const response = await this.authenticationService.attemptLogin(credentials);

    // Authentication failed:
    if (response.error) {
      // console.log(response);
    }

    // We have a user, redirect to dasboard component:
    if (response.data) {
      // console.log(response.data);
      this.router.navigate(['/dashboard']);
    }
  };
}
