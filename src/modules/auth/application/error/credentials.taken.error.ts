
export class CredentialsTaken extends Error {
    code: number
    msg: string
    constructor (msg?:string) {
      super()
      this.name = this.constructor.name
      this.msg = msg ? msg : 'Credentials taken'
      this.code = 401
    }
  }