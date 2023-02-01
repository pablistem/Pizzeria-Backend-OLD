import { ItemRepository } from "../../infrasctructure/item.repository";

export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}
}
