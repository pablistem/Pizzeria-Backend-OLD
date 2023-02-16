
export class NewProductDto {
  name: string
  description: string
  image: string
  category: string
  price: number
  stock: number

  constructor ({
    name,
    description,
    image,
    category,
    price,
    stock
  }: {

    name: string
    description: string
    image: string
    category: string
    price: number
    stock: number }) {
    this.name = name
    this.description = description
    this.image = image
    this.category = category
    this.price = price
    this.stock = stock
  }

  validate (): void {
    if (this.name === undefined) {
      throw new Error('Validation error')
    }
    if (this.description === undefined) {
      throw new Error('Validation error')
    }
    if (this.image === undefined) {
      throw new Error('Validation error')
    }
    if (this.category === undefined) {
      throw new Error('Validation error')
    }
    if (this.price === undefined) {
      throw new Error('Validation error')
    }
    if (this.stock === undefined) {
      throw new Error('Validation error')
    }
  }
}
