import Joi from "joi";
import { UserValidation } from "../error/UserValidation";
export class newUserDto {
  email: string;
  name: string;
  hash: string;

  constructor({
    email,
    name,
    hash,
  }: {
    email: string;
    name: string;
    hash: string;
  }) {
    this.email = email;
    this.name = name;
    this.hash = hash;
  }

  validate(): void {
    const schema = Joi.object({
      email: Joi.string().email(),
      name: Joi.string().min(3).max(30),
      hash: Joi.string().min(8),
    });

    const { error } = schema.validate(this);
    if (error) {
      throw new UserValidation("Error creating user", error);
    }
  }
}
