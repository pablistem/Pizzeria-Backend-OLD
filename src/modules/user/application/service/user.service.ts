import * as argon2 from "argon2";
import { User } from "../../domain/user.entity";
import {
  UserEntityNotDefined,
  UserNotFound,
  UserInUse,
  UserIdIsNotANumber,
} from "../error";
import { IUserRepository } from "../repository/user.repository.interface";
import { UserOptionalFiels } from "../dto/UserOptionalFiels.dto";
import { newUserDto } from "../dto/newUser.dto";

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getUserByEmail(email: string) {
    new UserOptionalFiels({ email }).validate();

    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new UserNotFound(`User does not exist`);
    }

    return user;
  }

  async getUserById(id: number): Promise<User> {
    if (isNaN(id)) {
      throw new UserIdIsNotANumber();
    }

    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new UserNotFound(`Id: ${id} does not exits`);
    }

    return user;
  }

  async addUser(user: User): Promise<User> {
    if (!(user instanceof User)) {
      throw new UserEntityNotDefined();
    }

    new newUserDto(user).validate();

    const existEmail = await this.userRepository.searchQuery({
      email: user.email,
    });
    if (existEmail) {
      throw new UserInUse(`user alredy in use`);
    }

    //Encrypted
    user.hash = await argon2.hash(user.hash);

    const savedUser = await this.userRepository.saveUser(user);

    return savedUser;
  }

  async updateUser(id: number, body: any): Promise<User> {
    if (isNaN(id)) {
      throw new UserIdIsNotANumber();
    }
    new UserOptionalFiels(body).validate();

    if (body.hash) {
      //Encrypted
      body.hash = await argon2.hash(body.hash);
    }

    const userUpdated = await this.userRepository.updateUser(id, body);

    if (!userUpdated) {
      throw new UserNotFound(`Id: ${id} does not exits`);
    }

    return userUpdated;
  }

  async deleteUser(id: number): Promise<void> {
    if (isNaN(id)) {
      throw new UserIdIsNotANumber();
    }

    await this.userRepository.deleteUser(id);
  }
}
