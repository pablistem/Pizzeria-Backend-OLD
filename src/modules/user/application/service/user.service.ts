import { User } from '../../domain/user.entity'
// import { type UserRepository } from '../../infrastructure/user.repository'
import { UserEntityNotDefined } from '../error/UserEntityNotDefined'
import { IUserRepository } from '../repository/user.repository.interface'

export class UserService {
  constructor (private readonly userRepository: IUserRepository) {

  }

  async addUser (user: User): Promise<User> {
    if (!(user instanceof User)) {
      throw new UserEntityNotDefined()
    }

    const savedUser = await this.userRepository.saveUser(user)

    return savedUser
  }
}
