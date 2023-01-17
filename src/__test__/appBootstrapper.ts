import express, { Request, Response, NextFunction, Application } from 'express'

import DIContainer from 'rsdi'
import cors from 'cors'
import { initProductModule } from '../modules/product/product.module'
import { initUserModule } from '../modules/user/user.module'
import ConfigDIC from '../config/DIConfig'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: '.env.test'
})

export default function AppBootstrapper (): { container: DIContainer, app: Application } {
  const app = express()

  const container = ConfigDIC()
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  initProductModule(app, container)
  initUserModule(app, container)

  app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err)
    res.status(err.code)
    res.json(err)
  })

  return { container, app }
}
