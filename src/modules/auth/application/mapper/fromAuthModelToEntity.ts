
import { Auth } from "../../domain/auth.entity"

export const fromAuthModeltoEntity = ({id,refreshToken}:any)=>{
 return new Auth(refreshToken,id)
}