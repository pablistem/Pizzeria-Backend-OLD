
export class InvalidRefreshToken extends Error {
    code: number
    msg: string
    constructor (msg?:string) {
      super()
      this.name = this.constructor.name
      this.msg = msg ? msg : 'Invalid or expired redfresh token'
      this.code = 401
    }
  }