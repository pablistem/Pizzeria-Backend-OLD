import { Base } from "../../common/domain/base.entity"

export class Product extends Base {

  name: string
  description: string
  image: string
  category: string
  price: number
  stock: number

  constructor (
    name: string,
    description: string,
    image: string,
    price: number,
    category: string,
    stock: number,
    id?:number,
    createdAt?: string,
    updatedAt?: string) {
   super(id ,createdAt,updatedAt)
    this.name = name
    this.description = description
    this.image = image
    this.price = price
    this.category = category
    this.stock = stock
   
  }
}
