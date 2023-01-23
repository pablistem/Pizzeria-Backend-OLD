import express, { Request, Response, NextFunction, Application } from 'express'
import DIContainer, { IDIContainer } from 'rsdi'
import cors from 'cors'
import { initProductModule } from '../modules/product/product.module'
import { initUserModule, UserController } from '../modules/user/user.module'
import ConfigDIC from '../config/DIConfig'
import { AuthController, initAuthModule } from '../modules/auth/auth.module'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: '.env.test'
})

export default function AppBootstrapper (): { container: DIContainer, testApp: Application } {
  const testApp = express()

  const container = ConfigDIC()
  testApp.use(cors())
  testApp.use(express.json())
  testApp.use(express.urlencoded({ extended: true }))


  initAuthModule(testApp,container)
  initProductModule(testApp, container)
  initUserModule(testApp, container)

  testApp.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err)
    res.status(err.code)
    res.json(err)
  })

  return { container,  testApp }
}
