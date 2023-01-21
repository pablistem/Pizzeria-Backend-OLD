import { User } from "../../domain/user.entity";

export interface IUserRepository {
  getUserById(userId: number): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getAllUser(): Promise<User[] | null>;
  saveUser(user: User): Promise<User>;
  updateUser(id: number, body: Object): Promise<User | null>;
  deleteUser(id: number): Promise<User | null>;
  searchQuery(query: any): Promise<User | null>;
}
