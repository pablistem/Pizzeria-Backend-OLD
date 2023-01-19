import { fromModelToEntity } from "../application/mapper/fromModelToEntity";
import { IUserRepository } from "../application/repository/user.repository.interface";
import { User } from "../domain/user.entity";
import { UserModel } from "./user.model";

export class UserRepository implements IUserRepository {
  userModel: typeof UserModel;
  constructor(userModel: UserModel) {
    this.userModel = userModel as any;
  }

  async getUserById(userId: number): Promise<User | null> {
    const user = await this.userModel.findByPk(userId);

    return user === null ? null : fromModelToEntity(user);
  }

  async getAllUser(): Promise<User[] | null> {
    const users = await this.userModel.findAll();

    return users === null ? null : users.map((user) => fromModelToEntity(user));
  }

  async saveUser(user: User): Promise<User> {
    const savedUser = await this.userModel.create(user as any, {
      isNewRecord: Number.isNaN(user.id),
    });

    return fromModelToEntity(savedUser);
  }
}
