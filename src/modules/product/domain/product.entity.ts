export class Product {
  id: number | undefined
  name: string
  description: string
  image: string
  category: string
  price: number
  stock: number
  createdAt: string | undefined
  updatedAt: string | undefined

  constructor (
    id: number | undefined = undefined,
    name: string,
    description: string,
    image: string,
    price: number,
    category: string,
    stock: number,
    createdAt?: string,
    updatedAt?: string) {
    this.id = id
    this.name = name
    this.description = description
    this.image = image
    this.price = price
    this.category = category
    this.stock = stock
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
