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

  async updateUser(id: number, body: Object): Promise<User | null> {
    const userUpdated = await this.userModel.findOne({ where: { id } });

    userUpdated?.set(body);

    await userUpdated?.save();

    return userUpdated === null ? null : fromModelToEntity(userUpdated);
  }

  async deleteUser(id: number): Promise<User | null> {
    const userDeleted = await this.userModel.destroy({ where: { id } });

    return userDeleted === null ? null : fromModelToEntity(userDeleted);
  }

  async existEmail(email: string): Promise<Boolean> {
    const existEmail = await this.userModel.findOne({ where: { email } });

    return existEmail ? true : false;
  }
}
