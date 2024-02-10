import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { AuthenticationService } from './services/authentication.service';
import { ResponseInterface } from './interfaces/response.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [ApiService, AuthenticationService],
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @HostBinding('class.login-register') rootClass: boolean = false;
  title = 'client';
  user: any;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // Listen for route changes to validate the session if there is one.
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.validateSession(event.url);
        this.rootClass = this.setRootClass(event.url);
      }
    });
  }

  private validateSession = async (
    routeTarget: string
  ): Promise<ResponseInterface | boolean> => {
    const result = await this.authenticationService.checkSession();
    if (result.error) {
      if (routeTarget === '/register') {
        this.router.navigate(['/register']);
        return false;
      }
      this.router.navigate(['/login']);
      return false;
    }

    // Set the user value so we can read it throughout the application? Maybe an observable/subject in service.
    this.user = result.data;
    // If there is a valid session but user is attemping to reach the login page, we redirect to dashboard component.
    if (routeTarget === '/login' || routeTarget === '/register') {
      routeTarget = '/dashboard';
    }
    this.router.navigate([routeTarget]);
    return result;
  };

  private setRootClass(routeTarget: string): boolean {
    if (routeTarget === '/login' || routeTarget === '/register') {
      return true;
    }
    return false;
  }
}
