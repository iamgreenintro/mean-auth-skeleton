import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { RegisterModules } from './register.module';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DOCUMENT } from '@angular/common';
// import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  standalone: true,
  imports: [RegisterModules],
  providers: [UserService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  public username: string = '';
  public password: string = '';
  public isPasswordHidden: boolean = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private userService: UserService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Set class to apply specific styling (this is to be done in login and register component).
    this.renderer.addClass(
      this.document.querySelector('app-root'),
      'login-register'
    );
  }

  public register = async (): Promise<void> => {
    const credentials = { username: this.username, password: this.password };
    // console.log(credentials);

    const response = await this.userService.createUser(credentials);
    if (!response.error) {
      this.router.navigate(['/login']);
    }
  };
}
