import { AuthModel } from "../../auth.module"
import { Auth } from "../../domain/auth.entity"

export const fromAuthModeltoEntity = ({id,refreshToken,user}:any)=>{
 return new Auth(refreshToken,id,user)
}