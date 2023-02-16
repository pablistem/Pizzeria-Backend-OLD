import { Application } from "express";
import { ItemService } from "../application/service/item.service";
import { ItemRepository } from "../infrastructure/item.repository";

export class ItemController {
  baseRoute = "/item";

  constructor(
    private readonly itemService: ItemService,
    private readonly itemRepository: ItemRepository
  ) {}

  configureRoutes(app: Application) {}
}
