import express, { Request, Response, NextFunction, Application } from 'express'
import DIContainer, { IDIContainer } from 'rsdi'
import cors from 'cors'
import { initProductModule } from '../modules/product/product.module'
import { initUserModule, UserController } from '../modules/user/user.module'
import ConfigDIC from '../config/DIConfig'
import { initAuthModule } from '../modules/auth/auth.module'
import { initOrderModule } from '../modules/order/order.module'
import { initItemModule } from '../modules/item/item.module'
import { initMessageModule } from '../modules/message/message.module'

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


  initAuthModule(testApp, container);
  initUserModule(testApp, container);
  initProductModule(testApp, container);
  initMessageModule(testApp, container);
  initOrderModule(testApp, container)
  initItemModule(testApp, container);
  

  testApp.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err)
    res.status(err.code)
    res.json(err)
  })

  return { container,  testApp }
}
