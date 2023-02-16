import { ItemRepository } from "../../infrastructure/item.repository";

export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}
}
