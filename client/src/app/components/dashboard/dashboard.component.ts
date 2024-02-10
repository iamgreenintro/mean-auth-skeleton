import { Component } from '@angular/core';
import { DashboardModules } from './dashboard.module';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'dashboard',
  standalone: true,
  providers: [AuthenticationService, UserService],
  imports: [DashboardModules],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public users: any | null = [];
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    //
  }

  public logout = async (): Promise<void> => {
    const response = await this.authenticationService.logout();
    return;
  };

  public getUsers = async (): Promise<void> => {
    const response = await this.userService.getAllUsers();
    if (!response.error) {
      this.users = response.data;
    } else {
      this.users = response.message;
    }
  };
}
