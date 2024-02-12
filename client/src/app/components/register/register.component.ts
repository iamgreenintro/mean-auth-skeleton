import { Component } from '@angular/core';
import { RegisterModules } from './register.module';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
// import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  standalone: true,
  imports: [RegisterModules],
  providers: [UserService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public username: string = '';
  public password: string = '';
  public isPasswordHidden: boolean = true;

  constructor(private router: Router, private userService: UserService) {}

  public register = async (): Promise<void> => {
    const credentials = { username: this.username, password: this.password };
    // console.log(credentials);

    const response = await this.userService.createUser(credentials);
    if (!response.error) {
      this.router.navigate(['/login']);
    }
  };
}
