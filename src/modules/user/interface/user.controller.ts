import { Application } from 'express'
import { IUserRepository } from '../application/repository/user.repository.interface'
import { UserService } from '../application/service/user.service'
// import { UserRepository } from '../infrastructure/user.repository'

export class UserController {
  baseRoute = '/user'
  constructor (private readonly userService: UserService, private readonly userRepository: IUserRepository) {

  }

  configureRoutes (app: Application): void {
    app.get(`${this.baseRoute}`, () => {})
    app.put(`${this.baseRoute}/:id`, () => {})
  }
}
