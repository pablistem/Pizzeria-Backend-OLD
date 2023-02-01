import { User } from "../../user/domain/user.entity";


export class Auth {
  id: number | undefined;
  user: User 
  refreshToken: string;
  
 

  constructor( refreshToken: string, user:User , id?:number ) {
    this.id = id;
    this.refreshToken = refreshToken;
    this.user = user
  }
}
