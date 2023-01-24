import { IDIContainer } from "rsdi";
import { AuthModel } from "../modules/auth/auth.module";
import { UserModel } from "../modules/user/infrastructure/user.model";

export default function SetDataAssociations(container: IDIContainer): void {
  const user: typeof UserModel = container.get("UserModel");
  const auth: typeof AuthModel = container.get("AuthModel");

  user.hasMany(auth, { as: "auths", foreignKey: "user_id" });
  auth.belongsTo(user, { as: "user", foreignKey: "user_id" });
}
