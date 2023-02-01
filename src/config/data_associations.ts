import { IDIContainer } from "rsdi";
import { AuthModel } from "../modules/auth/auth.module";
import { UserModel } from "../modules/user/infrastructure/user.model";

export default function SetDataAssociations(container: IDIContainer): void {
  const user: typeof UserModel = container.get("UserModel");
  const auth: typeof AuthModel = container.get("AuthModel");

  user.hasMany(auth, { as: "sessions", foreignKey: "userId" });
  auth.belongsTo(user, { foreignKey: "userId" });
}
