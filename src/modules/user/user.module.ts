import { Application } from 'express'
import DIContainer, { IDIContainer } from 'rsdi'
import { UserController } from './interface/user.controller'
import { UserService } from './application/service/user.service'
import { UserRepository } from './infrastructure/user.repository'

const initUserModule = (app: Application, container: DIContainer): void => {
  const userController: UserController = (container as IDIContainer).get(UserController)
  userController.configureRoutes(app)
}

export {
  initUserModule,
  UserController,
  UserService,
  UserRepository
}
