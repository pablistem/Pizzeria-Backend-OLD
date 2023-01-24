import { Auth } from "../../domain/auth.entity"




export interface IAuthRepository {

  saveRefreshToken (token: Auth): Promise<Auth>
  
  removeRefreshToken (token: Auth): Promise<void> 
   
   
  
}
