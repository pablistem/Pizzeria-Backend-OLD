
export class WrongPassword extends Error {
    code: number
    msg: string
    constructor () {
      super()
      this.name = this.constructor.name
      this.msg = 'Wrong Password'
      this.code = 403
    }
  }