import express, {
  type NextFunction,
  type Response,
  type Request,
} from "express";
import ConfigDIC from "./config/DIConfig";
import { initUserModule } from "./modules/user/user.module";
import cors from "cors";
import { initProductModule } from "./modules/product/product.module";
import { initAuthModule } from "./modules/auth/auth.module";
import { initMessageModule } from "./modules/message/message.module";
import { initOrderModule } from "./modules/order/order.module";
import { initItemModule } from "./modules/item/item.module";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
const app = express();

const port = process.env.PORT ?? 3000;

const container = ConfigDIC();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initAuthModule(app, container);
initUserModule(app, container);
initProductModule(app, container);
initMessageModule(app, container);
initOrderModule(app, container)
initItemModule(app, container);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(err.code);
  res.json(err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
