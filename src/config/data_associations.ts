import { IDIContainer } from "rsdi";
import { AuthModel } from "../modules/auth/auth.module";
import { ItemModel } from "../modules/item/infrastructure/item.model";
import { OrderModel } from "../modules/order/infrastructure/order.model";
import { ProductModel } from "../modules/product/infrastructure/product.model";
import { UserModel } from "../modules/user/infrastructure/user.model";

export default function SetDataAssociations(container: IDIContainer): void {
  const user: typeof UserModel = container.get("UserModel");
  const auth: typeof AuthModel = container.get("AuthModel");
  const order: typeof OrderModel = container.get("OrderModel");
  const product: typeof ProductModel = container.get("ProductModel")
  const item: typeof ItemModel = container.get("ItemModel")

  user.hasMany(auth, { as: "sessions", foreignKey: "userId" });
  auth.belongsTo(user, { foreignKey: "userId" });
  user.hasMany(order, { as: "orders", foreignKey: "userId" });
  order.belongsTo(user, { foreignKey: "userId" });
  order.belongsToMany(product, {through: item, as: 'itemList'});
  product.belongsToMany(order, {through: item});
}
