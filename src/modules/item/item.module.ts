import { Application } from "express";
import DIContainer, { IDIContainer } from "rsdi";
import { ItemRepository } from "./infrastructure/item.repository";
import { ItemService } from "./application/service/item.service";
import { ItemController } from "./interface/item.controller";

const initItemModule = (app: Application, container: DIContainer): void => {
  const itemController: ItemController = (container as IDIContainer).get(
    ItemController
  );
  itemController.configureRoutes(app);
};

export { initItemModule, ItemRepository, ItemService, ItemController };
