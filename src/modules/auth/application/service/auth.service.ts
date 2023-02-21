
import { UserService } from '../../../user/application/service/user.service';
import { LoginDto, SignupDto } from '../dto';
import { Request, Response } from 'express';
import { IAuthRepository } from '../repository/auth.repository.interface';
import { RoleEnum, User } from '../../../user/domain/user.entity';
import * as argon2 from 'argon2';
import { UserNotFound } from '../../../user/application/error/UserNotFound';
import {CredentialsTaken, InvalidRefreshToken, Unauthorized, WrongPassword} from '../error';
import jwt from 'jsonwebtoken'
import { Auth } from '../../domain/auth.entity';
import { MessageService } from '../../../message/message.module';


export class AuthService {

 
  constructor(
    private readonly authRepository: IAuthRepository,
    private messageService: MessageService,
    private userService: UserService,
   
  ) {}
  async login(res:Response ,loginDto: LoginDto) {

    const user = await this.userService.getUserByEmail(loginDto.email)

    const match = await argon2.verify(user.hash as string, loginDto.password)

    if(!match){
      throw new WrongPassword()
    }

    const session = new Auth(this.getRefreshToken(user),user)

    await this.authRepository.saveRefreshToken(session)

    await this.setCookies(res,session.refreshToken)

    const access_token =  this.getAccessToken(user)

    return access_token
  }


 private getAccessToken(user:User):string {

  const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: 60 * 15 })

  return accessToken
  }

 private getRefreshToken(user:User):string{
  const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, String(process.env.REFRESH_TOKEN_SECRET), { expiresIn: 60 * 60 * 24 * 14 })

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
          const newUser = new User(signupDto.email,signupDto.name,signupDto.lastName,undefined,hash,true,RoleEnum.user)
          await this.userService.addUser(newUser)
         // const urlWithToken = jwt.sign({ id: newUser.id, email: newUser.email }, String(process.env.VERIFY_TOKEN_SECRET), { expiresIn: 60 * 60 * 24 * 14 })
         // await this.messageService.sendMail('pizzería don rémolo verificacion de email', signupDto.email,`http://localhost:${process.env.PORT}/auth/verify/${urlWithToken}`)
        }
      else{
    throw err
    }
  }

  }


  async refreshToken (refreshToken: string, res: Response): Promise<{ accessToken: string }> {
    await this.authRepository.removeRefreshToken(refreshToken)

    let userToRefresh: any

    jwt.verify(refreshToken, String(process.env.REFRESH_TOKEN_SECRET), (err, user) => {
      if (err != null) { throw new InvalidRefreshToken() }

      userToRefresh = user
    })

    const user = await this.userService.getUserByEmail(userToRefresh.email)
    const accessToken =  this.getAccessToken(user)

    return {accessToken}
  }

  async logout (refreshToken: string): Promise<void> {
    await this.authRepository.removeRefreshToken(refreshToken)
  }

  private async setCookies (res: Response, refreshToken: string): Promise<void> {
    res.cookie(String(process.env.HTTPONLY_COOKIE_NAME), refreshToken, {
      httpOnly: true,
      secure: true,
      path: '/auth/session',
      expires: new Date(new Date().getTime() + 60 * 60 * 24 * 14 * 1000)
    })
  }


 async verifyUser(token: string):Promise<void> {
  jwt.verify(token, String(process.env.VERIFY_TOKEN_SECRET), async (err, user: any) => {
    
    if (err != null) {
      throw new Unauthorized()
    }
    
    const userToVerify = await this.userService.getUserByEmail( user.email )

    userToVerify.verified = true

    await this.userService.updateUser(userToVerify)
              
  })
  }

}
