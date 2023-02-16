import { Application } from 'express'
import DIContainer, { IDIContainer } from 'rsdi'
import { OrderService } from './application/service/order.service'
import { OrderRepository } from './infrastructure/order.repository'
import { OrderController } from './interface/order.controller'

const initOrderModule = (app: Application, container: DIContainer): void => {
  const orderController: OrderController = (container as IDIContainer).get(OrderController)
  orderController.configureRoutes(app)
}

export {
  initOrderModule,
  OrderController,
  OrderService,
  OrderRepository
}
