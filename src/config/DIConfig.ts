import DIContainer, { type IDIContainer, object, use, factory } from 'rsdi'
import { Sequelize } from 'sequelize'
import { ProductModel } from '../modules/product/infrastructure/product.model'
import { ProductController, ProductService, ProductRepository } from '../modules/product/product.module'
import { UserModel } from '../modules/user/infrastructure/user.model'
import {
  UserService,
  UserRepository,
  UserController
} from '../modules/user/user.module'

const dbConfig = (): Sequelize => {
  if (process.env.PROJECT_STATUS === 'development') {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: './data/development_database.db'
    })
    return sequelize
  }

  if (process.env.PROJECT_STATUS === 'test') {
    const sequelize = new Sequelize('sqlite::memory:')
    return sequelize
  }

  if (process.env.PROJECT_STATUS === 'production') {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: './data/production_database.db'
    })
    return sequelize
  }

  throw Error('PROJECT_STATUS env variable not found')
}

const configureUserModel = (container: IDIContainer): typeof UserModel => {
  return UserModel.setup(container.get('sequelize'))
}

const configureProductModel = (container: IDIContainer): typeof ProductModel => {
  return ProductModel.setup(container.get('sequelize'))
}

const AddCommonDefinitions = (container: DIContainer): void => {
  container.add({
    sequelize: factory(dbConfig)
  })
}

const AddUserDefinitions = (container: DIContainer): void => {
  container.add({
    UserController: object(UserController).construct(use(UserService), use(UserRepository)),
    UserService: object(UserService).construct(use(UserRepository)),
    UserModel: factory(configureUserModel),
    UserRepository: object(UserRepository).construct(use(UserModel))
  })
}

const AddProductDefinitions = (container: DIContainer): void => {
  container.add({
    ProductController: object(ProductController).construct(use(ProductService), use(ProductRepository)),
    ProductService: object(ProductService).construct(use(ProductRepository)),
    ProductModel: factory(configureProductModel),
    ProductRepository: object(ProductRepository).construct(use(ProductModel))
  })
}

export default function ConfigDIC (): DIContainer {
  const container = new DIContainer()
  AddCommonDefinitions(container)
  AddUserDefinitions(container)
  AddProductDefinitions(container);
  (container as IDIContainer).get('sequelize').sync()
  return container
}
