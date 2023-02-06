
export class ValidationError extends Error{
    code:number
    msg:string
    validationError: any
    constructor(msg?:string, obj?:any){
        super(msg)
        this.code = 400
        this.name = this.constructor.name
        this.msg= msg ? msg : ''
        this.validationError = obj

    }
}