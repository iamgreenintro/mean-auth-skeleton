import { Router } from 'express';
import { RouterInterface } from './../interfaces/router.interface';
import IndexController from './../controllers/index.controller';
export default class IndexRoute implements RouterInterface {
  public path: string = '';
  public router: Router = Router();
  private controller = new IndexController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.path, this.controller.index);
    this.router.get(this.path + '/api', this.controller.indexApi);
  }
}
