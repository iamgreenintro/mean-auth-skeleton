import { Router } from 'express';
import { RouterInterface } from './../interfaces/router.interface';
import UserController from './../controllers/user.controller';

export default class UserRoute implements RouterInterface {
  public path: string = '/api/users';
  public router: Router = Router();
  private controller = new UserController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(this.path + '/create', this.controller.createUser);
  }
}
