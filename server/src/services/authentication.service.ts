import { scrypt } from 'crypto';
import UserModel from './../models/user.model';
import { ResponseInterface } from '../interfaces/response.interface';

export default class AuthenticationService {
  public async login(payload: { username: string; password: string }): Promise<ResponseInterface> {
    try {
      if (!payload || !payload.username || !payload.password) {
        throw new Error(`Missing credentials. Can not authenticate.`);
      }

      const user: { password: string; salt: string } | null = await UserModel.findOne({
        username: payload.username,
      });

      if (!user) {
        throw new Error(`Can not find any user with username: "${payload.username}"`);
      }

      const validCredentials = await this.isHashedPasswordMatching(
        payload.password,
        user.password,
        user.salt
      );

      if (!validCredentials) {
        throw new Error(`Invalid password for username: "${payload.username}"`);
      }

      const response: ResponseInterface = {
        data: user,
        message: '',
        error: false,
        code: 200,
      };

      return response;
    } catch (error: any) {
      if (error instanceof Error) {
        const response: ResponseInterface = {
          data: null,
          message: error.message,
          error: true,
          code: 400,
        };
        return response;
      }

      const response: ResponseInterface = {
        data: null,
        message: 'Error occured while attempting to login.',
        error: true,
        code: 400,
      };
      return response;
    }
  }

  private isHashedPasswordMatching(password: string, hashedPassword: string, salt: string) {
    return new Promise((resolve, reject) => {
      scrypt(password, salt, 32, async (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          // true if passwords match
          resolve(hashedPassword === derivedKey.toString('hex'));
        }
      });
    });
  }
}
