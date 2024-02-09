import express, { NextFunction, Request, Response } from 'express';
import {
  NODE_ENV,
  API_PORT,
  API_HOSTNAME,
  DB_CONNECTION_STRING,
  DB_CONNECTION_NAME,
  ACCESS_CONTROL_ALLOW_ORIGIN_VALUE,
} from './config';
import { RouterInterface } from './interfaces/router.interface';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';

export class App {
  private app!: express.Application;
  private env!: string;
  private port!: number | string;
  private hostname!: string;

  constructor(routes: RouterInterface[]) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cookieParser());

    // Set headers for client response:
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.append('Access-Control-Allow-Origin', [`${ACCESS_CONTROL_ALLOW_ORIGIN_VALUE}`]);
      res.append('Access-Control-Allow-Headers', 'Origin, Content-Type');
      res.append('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
      res.append('Access-Control-Allow-Credentials', 'true');
      next(); // Don't forget this or we will never return a response!
    });
    this.env = NODE_ENV || 'development';
    this.port = API_PORT || 3001;
    this.hostname = API_HOSTNAME || '127.0.0.1';

    this.initializeRoutes(routes);
    this.connectMongoDB();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
      console.log(`[MODE]:\t\t\t ${this.env.toUpperCase()}`);
      console.log(`[SERVER]:\t\t\t http://${this.hostname}:${this.port}/`);
      console.log(`[API]:\t\t\t http://${this.hostname}:${this.port}/api`);
      console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
    });
  }

  private initializeRoutes(routes: RouterInterface[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private async connectMongoDB() {
    try {
      await connect(`${DB_CONNECTION_STRING}/${DB_CONNECTION_NAME}`);
    } catch (error) {
      console.log(error);
    }
  }
}
