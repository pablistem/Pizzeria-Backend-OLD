import Joi from 'joi';

export class ProductDto {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  stock: number;

  constructor({
    id,
    name,
    description,
    image,
    category,
    price,
    stock,
  }: {
    id: number;
    name: string;
    description: string;
    image: string;
    category: string;
    price: number;
    stock: number;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.category = category;
    this.price = price;
    this.stock = stock;
  }

  validate(): void {
    const schema = Joi.object({
      id: Joi.number().required().messages({
        'any.required': 'ID is required',
      }),
      name: Joi.string().required().messages({
        'any.required': 'Name is required',
      }),
      description: Joi.string().required().messages({
        'any.required': 'Description is required',
      }),
      image: Joi.string().required().messages({
        'any.required': 'Image is required',
      }),
      category: Joi.string().required().messages({
        'any.required': 'Category is required',
      }),
      price: Joi.number().required().messages({
        'any.required': 'Price is required',
      }),
      stock: Joi.number().required().messages({
        'any.required': 'Stock is required',
      }),
    }).options({ abortEarly: false });

    const { error } = schema.validate(this);

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join('\n');
      throw new Error('Validation error:\n' + errorMessage);
    }
  }
}