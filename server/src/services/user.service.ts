import { ResponseInterface } from '../interfaces/response.interface';
import UserModel from './../models/user.model';

export default class UserService {
  public async getUsers(): Promise<ResponseInterface> {
    try {
      const users = await UserModel.find();
      const response: ResponseInterface = {
        data: users,
        message: '',
        error: false,
        code: 200,
      };

      return response;
    } catch (error) {
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
        message: 'Error occured while attempting to create a new user.',
        error: true,
        code: 400,
      };
      return response;
    }
  }

  public async createUser(payload: any): Promise<ResponseInterface> {
    try {
      const createdUser = await UserModel.create(payload);
      const response: ResponseInterface = {
        data: createdUser,
        message: '',
        error: false,
        code: 200,
      };
      return response;
    } catch (err: any) {
      if (err.code === 11000) {
        // Duplicate key encountered, user most likely exists already.
        const response: ResponseInterface = {
          data: null,
          message: 'Username already exists.',
          error: true,
          code: 409,
        };
        return response;
      }
      const response: ResponseInterface = {
        data: null,
        message: 'Error occured while attempting to create a new user.',
        error: true,
        code: 400,
      };
      return response;
    }
  }
}
