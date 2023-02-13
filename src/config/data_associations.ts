import { IDIContainer } from "rsdi";
import { AuthModel } from "../modules/auth/auth.module";
import { UserModel } from "../modules/user/infrastructure/user.model";
import { ItemModel } from "../modules/item/infrasctructure/item.model";
import { ProductModel } from "../modules/product/infrastructure/product.model";
import { OrderModel } from "../modules/order/infrastructure/order.model";

export default function SetDataAssociations(container: IDIContainer): void {
  const user: typeof UserModel = container.get("UserModel");
  const auth: typeof AuthModel = container.get("AuthModel");
  const item: typeof ItemModel = container.get("ItemModel");
  const product: typeof ProductModel = container.get("ProductModel");
  const order: typeof OrderModel = container.get("OrderModel");

  user.hasMany(auth, { as: "sessions", foreignKey: "userId" });
  auth.belongsTo(user, { foreignKey: "userId" });
  user.hasMany(order, { as: "orders", foreignKey: "userId" });
  order.belongsTo(user, { foreignKey: "userId" });
  order.hasMany(item, { as: "itemList", foreignKey: "orderId" });
  item.belongsTo(order, { foreignKey: "orderId" });
  item.belongsTo(product, { foreignKey: "productId" });
  product.hasMany(item, { foreignKey: "productId" });
}
