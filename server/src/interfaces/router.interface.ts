import { Router } from 'express';

export interface RouterInterface {
  path: string;
  router: Router;
}
