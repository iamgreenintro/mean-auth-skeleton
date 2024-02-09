import UserModel from './../models/user.model';

export default class UserService {
  private userModel = new UserModel();

  public async getAllUsers(): Promise<any> {
    const users = await UserModel.find();
    return users;
  }

  public async createUser(payload: any): Promise<any> {
    try {
      const createdUser = await UserModel.create(payload);
      return createdUser;
    } catch (err: any) {
      if (err.code === 11000) {
        // Duplicate key encountered, user most likely exists already.
        return null;
      }
      return err;
    }
  }
}
