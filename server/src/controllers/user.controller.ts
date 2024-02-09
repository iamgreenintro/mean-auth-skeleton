import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import { ResponseInterface } from '../interfaces/response.interface';
import { scrypt, randomBytes } from 'crypto';

export default class UserController {
  private userService: UserService = new UserService();

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { password } = req.body;

      // https://nodejs.org/docs/latest-v20.x/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback
      // https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf
      // SALT MUST BE UNIQUE AND STORED IN THE DB ALONGSIDE THE USER
      const salt = randomBytes(32).toString('hex');
      scrypt(password, salt, 32, async (err, derivedKey) => {
        const userToCreate = {
          password: derivedKey.toString('hex'),
          username: req.body['username'],
          salt: salt,
        };

        const createdUser = await this.userService.createUser(userToCreate);

        if (!createdUser) {
          const response: ResponseInterface = {
            data: null,
            error: true,
            message: 'Could not create a user with the passed body data.',
            code: 422, // or 409?
          };
          res.status(response.code).json(response);
        }

        if (createdUser?.errors) {
          const response: ResponseInterface = {
            data: null,
            error: true,
            message: 'An error occured during validating the input.',
            code: 422,
          };
          res.status(response.code).json(response);
        }

        const response: ResponseInterface = {
          data: createdUser,
          error: false,
          message: 'Created a new user.',
          code: 200,
        };
        res.status(200).json(response);
      });
    } catch (error) {
      // Let Express handle the error for now:
      if (error instanceof Error) {
        next(`\x1b[41m[${error.name}]\x1b[0m:\t${error.message}`);
      } else {
        next(error);
      }
    }
  };
}
