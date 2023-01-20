import Joi from "joi";
import { ValidationError } from "../error/validation.error";


export class LoginDto {

  email: string;

  password: string;

  constructor({email, password}:{email:string, password:string}){
    this.email = email
    this.password = password
  }

  validate(){
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().min(8)
  });

  const {error} = schema.validate(this)
  if(error){
    throw new ValidationError('Login failed',error)
  }
  }
}
