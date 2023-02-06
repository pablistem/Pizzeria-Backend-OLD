

import { Application } from 'express'
import DIContainer, { IDIContainer } from 'rsdi'
import { AuthService } from './application/service/auth.service'
import { AuthRepository } from './infrastructure/auth.repository'
import { AuthController } from './interface/auth.controller'
import { AuthModel } from './infrastructure/auth.model'
const initAuthModule = (app: Application, container: DIContainer): void => {
  const authController: AuthController = (container as IDIContainer).get(AuthController)
  authController.configureRoutes(app)
}

export {
  initAuthModule,
  AuthController,
  AuthService,
  AuthRepository,
  AuthModel,
}
