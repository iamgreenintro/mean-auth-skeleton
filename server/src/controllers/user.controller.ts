import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import { ResponseInterface } from '../interfaces/response.interface';
import { scrypt, randomBytes } from 'crypto';

export default class UserController {
  private userService: UserService = new UserService();

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { password, username } = req.body;
      if (!password || !username) {
        // Will throw an error if we are missing the username or password required to continue the request.
        throw new Error('Username and password are required!');
      }

      if (password.length < 6 || username.length < 6) {
        // Will throw an error if the username or password are too short.
        throw new Error('Username and password must be at least 6 characters each.');
      }

      // https://nodejs.org/docs/latest-v20.x/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback
      // https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf
      const salt = randomBytes(32).toString('hex');
      scrypt(password, salt, 32, async (err, derivedKey) => {
        const userToCreate = {
          password: derivedKey.toString('hex'),
          username: username,
          salt: salt,
        };

        const serviceResponse = await this.userService.createUser(userToCreate);
        res.status(serviceResponse.code).json(serviceResponse);
      });
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
}
