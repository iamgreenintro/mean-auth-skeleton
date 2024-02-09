import { NextFunction, Request, Response } from 'express';

export default class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.redirect(307, 'api');
      console.log('[GET]:\t\t' + req.url);
    } catch (error) {
      next(error);
    }
  };

  public indexApi = (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('[GET]:\t\t' + req.url);
      res.status(200).send(`<p style="text-align: center;">Base endpoint</p>`);
    } catch (error) {
      next(error);
    }
  };
}
