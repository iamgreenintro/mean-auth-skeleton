/**
 * The AuthenticationMiddleware is to secure API routes and to only have them used by a valid HttpCookie.
 * We want this so we can block requests going to the API which otherwise would lead to anyone being able to consume the data.
 * The cookie value and expiration together determine if the middleware throws an error or forwards to the next request function.
 */

import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';
import { COOKIE_NAME_AUTH } from '../config';
import { ResponseInterface } from '../interfaces/response.interface';

const AuthenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookieValue = req.cookies[`${COOKIE_NAME_AUTH}`];
    console.log(cookieValue);

    if (!cookieValue) {
      throw new Error('Cookie expired or is empty. Access has been denied!');
    }

    const user = await UserModel.findById(cookieValue);

    if (!user) {
      // Can happen if the user has been deleted from the DB.
      throw new Error('Can not verify the cookie value. Access has been denied!');
    }
    next();
  } catch (error) {
    if (error instanceof Error) {
      const errorResponse: ResponseInterface = {
        data: null,
        error: true,
        message: error.message,
        code: 400,
      };
      res.status(errorResponse.code).json(errorResponse);
    } else {
      // Let Express handle the error for now:
      next(error);
    }
  }
};

export default AuthenticationMiddleware;
