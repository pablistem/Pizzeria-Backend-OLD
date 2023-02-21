import Joi from "joi";
import { ValidationError } from "../error/validation.error";


export class SignupDto{

  name:string;

  lastName:string;

  email: string;

  password: string;

  constructor({name, lastName, email, password}:{name:string, lastName:string, email:string, password:string,}){
    this.name = name
    this.lastName = lastName
    this.email = email.toLowerCase()
    this.password = password
  }

  validate(){
    const schema = Joi.object({
      name: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(8)
  });

  
    const {error} = schema.validate(this)
    if(error){
      throw new ValidationError('Signup failed',error)
    }
    }
  }