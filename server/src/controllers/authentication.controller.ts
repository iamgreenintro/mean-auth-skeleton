import AuthenticationService from '../services/authentication.service';
import { ResponseInterface } from '../interfaces/response.interface';
import { NextFunction, Request, Response } from 'express';
import { COOKIE_DURATION_MINUTE, COOKIE_NAME_AUTH } from '../config';

export default class AuthController {
  private authService: AuthenticationService = new AuthenticationService();

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password } = req.body;
      const serviceResponse = await this.authService.login({
        username: username,
        password: password,
      });

      if (serviceResponse.error) {
        // Something went wrong, expose error to client.
        res.status(serviceResponse.code).json(serviceResponse);
      } else {
        // Authentication succeeced!
        // Set a httpOnly cookie with the extracted userID as the cookie value.
        this.setHttpCookie(res, serviceResponse.data['id']);
        res.status(serviceResponse.code).json(serviceResponse);
      }
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

  public logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cookieValue = req.cookies[`${COOKIE_NAME_AUTH}`];

      if (!cookieValue) {
        throw new Error('Session has already expired.');
      }

      // Destroy cookie:
      res.cookie(`${COOKIE_NAME_AUTH}`, cookieValue, {
        secure: true,
        httpOnly: true,
        expires: new Date(0),
      });

      res.status(200).json(null);
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

  // The client can target this endpoint to check if there's an active session.
  // It's only purpose is to check for a valid httpCookie containing the userID and return the matching user.
  public checkSession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cookieValue = req.cookies[`${COOKIE_NAME_AUTH}`];
      if (!cookieValue) {
        throw new Error('Session has already expired.');
      }

      const serviceResponse = await this.authService.findUser(cookieValue);
      res.status(serviceResponse.code).json(serviceResponse);
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

  // HttpOnly cookie will be set to protect the api routes when the cookie has expired or does not exist.
  // This is strictly server side protection.
  private setHttpCookie(res: Response, value: string): void {
    // Set a HttpOnly cookie containing the user id value.
    res.cookie(`${COOKIE_NAME_AUTH}`, value, {
      // Https only (but it should allow localhost too!)
      secure: true,
      // Important: must be httpOnly for security reasons!
      httpOnly: true,
      // Initial expiration time. Will be prolonged/refreshed when certain api routes are hit.
      expires: new Date(Date.now() + Number(COOKIE_DURATION_MINUTE) * 5),
    });
  }
}
