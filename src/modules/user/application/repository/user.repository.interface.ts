import { User } from "../../domain/user.entity";

export interface IUserRepository {
  getUserById(userId: number): Promise<User>;
  getAllUser(): Promise<User[] | null>;
  saveUser(user: User): Promise<User>;
}
