import { ItemModel } from "./item.model";

export class ItemRepository {
  private readonly itemModel: typeof ItemModel;
  constructor(itemModel: ItemModel) {
    this.itemModel = itemModel as any;
  }
}
