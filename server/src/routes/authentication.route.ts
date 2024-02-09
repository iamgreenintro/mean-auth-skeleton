import { Router } from 'express';
import { RouterInterface } from './../interfaces/router.interface';
import AuthenticationController from './../controllers/authentication.controller';

export default class AuthenticationRoute implements RouterInterface {
  public path: string = '/api/authentication';
  public router: Router = Router();
  private controller = new AuthenticationController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(this.path, this.controller.login);
  }
}
