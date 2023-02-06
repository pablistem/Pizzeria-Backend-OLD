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

    const savedUser = this.userModel.build({...user} as any, {
      isNewRecord: !user.id,
    });

   await savedUser.save()

    return fromModelToEntity(savedUser);
  }

  async deleteUser(id: number): Promise<User | null> {
    const userDeleted = await this.userModel.destroy({ where: { id } });

    return userDeleted === null ? null : fromModelToEntity(userDeleted);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    console.log(email);
    const user = await this.userModel.findOne({ where: { email } });

    if (user === null) {
      return null;
    }
    return fromModelToEntity(user);
  }
}
