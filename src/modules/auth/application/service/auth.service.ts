
import { UserService } from '../../../user/application/service/user.service';
import { LoginDto, SignupDto } from '../dto';
import { Request } from 'express';
import { IAuthRepository } from '../repository/auth.repository.interface';
import { RoleEnum, User } from '../../../user/domain/user.entity';
import * as argon2 from 'argon2';
import { UserNotFound } from '../../../user/application/error/UserNotFound';
import {CredentialsTaken, WrongPassword} from '../error';
import jwt from 'jsonwebtoken'


export class AuthService {
 
  constructor(
    private readonly authRepository: IAuthRepository,
    private userService: UserService,
   
  ) {}
  async login(loginDto: LoginDto) {

    const user = await this.userService.getUserByEmail(loginDto.email)

    const match = await argon2.verify(user.hash as string, loginDto.password)

    if(!match){
      throw new WrongPassword()
    }

    const access_token =  this.getAccessToken(user)

    return access_token
  }


  getAccessToken(user:User):string {

  const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: 60 * 15 })

  return accessToken
  }




  async signup(signupDto: SignupDto) {

try{
 const user = await this.userService.getUserByEmail(signupDto.email)

  if(user){
    throw new CredentialsTaken(`A user with email: ${signupDto.email} already exist`)
  }
}
catch(err){
  if(err instanceof UserNotFound){
    const hash =  await argon2.hash(signupDto.password)
    const newUser = new User(signupDto.email,'name',undefined,hash,false,RoleEnum.user)
   
    await this.userService.addUser(newUser)
  }
  else{
    throw err
  }
}
    
  

   
   
   
  }
  

}
