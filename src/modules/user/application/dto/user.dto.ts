import Joi from "joi";

export class UserDto {
  id: number;
  email: string;
  name: string;
  lastName:string;
  verified: boolean | undefined;

  constructor({
    id,
    email,
    name,
    lastName,
    verified,
  }: {
    id: number;
    email: string;
    name: string;
    lastName:string;
    verified?: boolean | undefined;
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.lastName = lastName;
    this.verified = verified;
  }

  validate(): void {
    const schema = Joi.object({
      id: Joi.number().required(),
      email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
      }),
      name: Joi.string().max(40).required().messages({
        'string.max': 'Name must not exceed 40 characters',
        'any.required': 'Name is required',
      }),
      lastName: Joi.string().required().max(40).required().messages({
        'string.max': 'Lastname must not exceed 40 characters',
        'any.required': 'Lastname is required',
      }),
      verified: Joi.boolean().optional(),
    }).options({ abortEarly: false });
  
    const { error } = schema.validate(this);
  
    if (error) {
      throw new Error('Validation error: ' + error.details[0].message);
    }
  }
}
