import { AuthModel } from "./auth.model"
export class AuthRepository {
  private readonly authModel: typeof AuthModel
  constructor (authModel: AuthModel) {
    this.authModel = authModel as any
  }

 
}
