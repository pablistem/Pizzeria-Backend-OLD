export class OrderEntityNotDefined extends Error {
  code: number

  constructor () {
    super()
    this.name = this.constructor.name
    this.message = 'Order not defined!!!'
    this.code = 400
  }
}
