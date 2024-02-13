import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardModules } from './dashboard.module';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'dashboard',
  standalone: true,
  providers: [UserService],
  imports: [DashboardModules],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  public users: any | null = [];
  public user: any | null = null;
  public subscription: any | null = null;
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Subscribe to the user BehaviorSubject during component initialization
    this.subscription = this.authenticationService.user.subscribe(
      (response) => {
        // Update the local user variable whenever there's a new emission
        this.user = response;
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from the user BehaviorSubject subscription to prevent memory leaks
    this.subscription.unsubscribe();
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
