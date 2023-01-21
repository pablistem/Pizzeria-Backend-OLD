
export class Unauthorized extends Error {
    code: number
    msg: string
    constructor () {
      super()
      this.name = this.constructor.name
      this.msg = 'Not authorized'
      this.code = 401
    }
  }