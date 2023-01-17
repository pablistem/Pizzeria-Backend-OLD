export class UserEntityNotDefined extends Error {
  code: number

  constructor () {
    super()
    this.name = this.constructor.name
    this.message = 'User not defined!!!'
    this.code = 400
  }
}
