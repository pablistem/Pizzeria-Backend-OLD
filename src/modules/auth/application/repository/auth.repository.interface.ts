import { Auth } from "../../domain/auth.entity"




export interface IAuthRepository {

  saveRefreshToken (token: string): Promise<Auth>
  
  removeRefreshToken (token: string): Promise<void> 
   
   
  
}
