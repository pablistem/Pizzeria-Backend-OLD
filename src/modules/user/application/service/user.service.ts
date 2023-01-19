import bcrypt from "bcryptjs";
import { User } from "../../domain/user.entity";
import { type UserRepository } from "../../infrastructure/user.repository";
import { UserEntityNotDefined } from "../error/UserEntityNotDefined";
import { IUserRepository } from "../repository/user.repository.interface";
import { UserNotFound } from "../error/UserNotFound";

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async addUser(user: User): Promise<User> {
    if (!(user instanceof User)) {
      throw new UserEntityNotDefined();
    }

    //Encrypted
    const salt = bcrypt.genSaltSync();
    user.hash = bcrypt.hashSync(user.hash, salt);

    const savedUser = await this.userRepository.saveUser(user);

    return savedUser;
  }

  async getOneUser(id: number): Promise<User> {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new UserNotFound(`Id: ${id} does not exits`);
    }

    return user;
  }

  async updateUser(id: number, body: any): Promise<User> {
    if (body.hash) {
      //Encrypted
      const salt = bcrypt.genSaltSync();
      body.hash = bcrypt.hashSync(body.hash, salt);
    }

    const userUpdated = await this.userRepository.updateUser(id, body);

    if (!userUpdated) {
      throw new UserNotFound(`Id: ${id} does not exits`);
    }

    return userUpdated;
  }
}
