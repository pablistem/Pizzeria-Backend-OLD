
import { User } from "../../domain/user.entity";

import { UserEntityNotDefined } from "../error/UserEntityNotDefined";
import { IUserRepository } from "../repository/user.repository.interface";
import { UserNotFound } from "../error/UserNotFound";


export class UserService {

  constructor(private readonly userRepository: IUserRepository) {}



  async getUserByEmail(email: string):Promise<User> {
   const user =  await this.userRepository.getUserByEmail(email)
 
   if(!user){
    throw new UserNotFound(`User with email ${email} does not exits`)
   }

   return user
  }




  async addUser(user: User): Promise<User> {
    if (!(user instanceof User)) {
      throw new UserEntityNotDefined();
    }
    
    const savedUser = await this.userRepository.saveUser(user);

    return savedUser;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new UserNotFound(`Id: ${id} does not exits`);
    }
    return user;
  }

  async updateUser(newUserData:User): Promise<User> {

    const userUpdated = await this.userRepository.saveUser(newUserData);

    if (!userUpdated) {
      throw new UserNotFound(`Id: ${newUserData.id} does not exits`);
    }

    return userUpdated;
  }
}
