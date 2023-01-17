export class ProductEntityNotDefined extends Error {
  code: number

  constructor () {
    super()
    this.name = this.constructor.name
    this.message = 'Product not defined!!!'
    this.code = 400
  }
}
