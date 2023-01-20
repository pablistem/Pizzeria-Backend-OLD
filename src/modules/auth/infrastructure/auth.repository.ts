import { fromAuthModeltoEntity } from "../application/mapper/fromAuthModelToEntity"
import { Auth } from "../domain/auth.entity"
import { AuthModel } from "./auth.model"
export class AuthRepository {
  private readonly authModel: typeof AuthModel
  constructor (authModel: AuthModel) {
    this.authModel = authModel as any
  }
  async saveRefreshToken (token: string): Promise<Auth> {

    const savedToken = this.authModel.build({ refreshToken: token })

    await savedToken.save()


    return fromAuthModeltoEntity(savedToken)
  }

  async removeRefreshToken (token: string): Promise<void> {
    await this.authModel.destroy({ where: { refreshToken: token } })
  }
 
}
