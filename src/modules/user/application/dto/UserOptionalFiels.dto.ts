import Joi from "joi";
import { UserValidation } from "../error/UserValidation";

export class UserOptionalFiels {
  email?: string;
  name?: string;
  hash?: string;

  constructor({
    email,
    name,
    hash,
  }: {
    email?: string;
    name?: string;
    hash?: string;
  }) {
    this.email = email;
    this.name = name;
    this.hash = hash;
  }

  validate(): void {
    const schema = Joi.object({
      email: Joi.string().optional().email(),
      name: Joi.string().optional().min(3).max(30),
      hash: Joi.string().optional().min(8),
    });

    const { error } = schema.validate(this);
    if (error) {
      throw new UserValidation("Update user failed", error);
    }
  }
}
