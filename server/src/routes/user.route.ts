import { Router } from 'express';
import { RouterInterface } from './../interfaces/router.interface';
import UserController from './../controllers/user.controller';
import AuthenticationMiddleware from '../middlewares/authentication.middleware';

export default class UserRoute implements RouterInterface {
  public path: string = '/api/users';
  public router: Router = Router();
  private controller = new UserController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.path, AuthenticationMiddleware, this.controller.getUsers);
    this.router.post(this.path + '/create', this.controller.createUser);
  }
}
