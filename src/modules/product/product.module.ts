import { Application } from 'express'
import DIContainer, { IDIContainer } from 'rsdi'
import { ProductService } from './application/service/product.service'
import { ProductRepository } from './infrastructure/product.repository'
import { ProductController } from './interface/product.controller'

const initProductModule = (app: Application, container: DIContainer): void => {
  const productController: ProductController = (container as IDIContainer).get(ProductController)
  productController.configureRoutes(app)
}

export {
  initProductModule,
  ProductController,
  ProductService,
  ProductRepository
}
