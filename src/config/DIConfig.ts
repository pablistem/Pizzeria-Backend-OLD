import DIContainer, { type IDIContainer, object, use, factory } from "rsdi";
import { Sequelize } from "sequelize";
import {
  AuthController,
  AuthService,
  AuthRepository,
  AuthModel,
} from "../modules/auth/auth.module";
import { ProductModel } from "../modules/product/infrastructure/product.model";
import {
  ProductController,
  ProductService,
  ProductRepository,
} from "../modules/product/product.module";
import { UserModel } from "../modules/user/infrastructure/user.model";
import {
  UserService,
  UserRepository,
  UserController,
} from "../modules/user/user.module";
import {
  MessageRepository,
  MessageService,
  MessageController,
} from "../modules/message/message.module";
import { MessageModel } from "../modules/message/infrastructure/message.model";

const dbConfig = (): Sequelize => {
  if (process.env.PROJECT_STATUS === "development") {
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "./data/development_database.db",
    });
    return sequelize;
  }

  if (process.env.PROJECT_STATUS === "test") {
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: `./data/test/test${Math.random() * 1000}.db`,
      logging: false,
    });
    return sequelize;
  }

  if (process.env.PROJECT_STATUS === "production") {
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "./data/production_database.db",
    });
    return sequelize;
  }

  throw Error("PROJECT_STATUS env variable not found");
};

const configureAuthModel = (container: IDIContainer): typeof AuthModel => {
  return AuthModel.setup(container.get("sequelize"));
};

const configureUserModel = (container: IDIContainer): typeof UserModel => {
  return UserModel.setup(container.get("sequelize"));
};

const configureProductModel = (
  container: IDIContainer
): typeof ProductModel => {
  return ProductModel.setup(container.get("sequelize"));
};

const configureMessageModel = (
  container: IDIContainer
): typeof MessageModel => {
  return MessageModel.setup(container.get("sequelize"));
};

const AddCommonDefinitions = (container: DIContainer): void => {
  container.add({
    sequelize: factory(dbConfig),
  });
};

const AddAuthDefinitions = (container: DIContainer): void => {
  container.add({
    AuthController: object(AuthController).construct(use(AuthService)),
    AuthService: object(AuthService).construct(
      use(AuthRepository),
      use(UserService)
    ),
    AuthRepository: object(AuthRepository).construct(use(AuthModel)),
    AuthModel: factory(configureAuthModel),
  });
};

const AddUserDefinitions = (container: DIContainer): void => {
  container.add({
    UserController: object(UserController).construct(
      use(UserService),
      use(UserRepository)
    ),
    UserService: object(UserService).construct(use(UserRepository)),
    UserRepository: object(UserRepository).construct(use(UserModel)),
    UserModel: factory(configureUserModel),
  });
};

const AddProductDefinitions = (container: DIContainer): void => {
  container.add({
    ProductController: object(ProductController).construct(
      use(ProductService),
      use(ProductRepository)
    ),
    ProductService: object(ProductService).construct(use(ProductRepository)),
    ProductRepository: object(ProductRepository).construct(use(ProductModel)),
    ProductModel: factory(configureProductModel),
  });
};

const AddMessageDefinitions = (container: DIContainer): void => {
  container.add({
    MessageController: object(MessageController).construct(
      use(MessageService),
      use(MessageRepository)
    ),
    MessageService: object(MessageService).construct(use(MessageRepository)),
    MessageModel: factory(configureMessageModel),
    MessageRepository: object(MessageRepository).construct(use(MessageModel)),
  });
};

export default function ConfigDIC(): DIContainer {
  const container = new DIContainer();
  AddCommonDefinitions(container);
  AddAuthDefinitions(container);
  AddUserDefinitions(container);
  AddProductDefinitions(container);
  AddMessageDefinitions(container);
  (container as IDIContainer).get("sequelize").sync();
  return container;
}
