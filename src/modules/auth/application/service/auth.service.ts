
import { UserService } from '../../../user/application/service/user.service';
import { LoginDto, SignupDto } from '../dto';
import { Request, Response } from 'express';
import { IAuthRepository } from '../repository/auth.repository.interface';
import { User } from '../../../user/domain/user.entity';
import * as argon2 from 'argon2';


export class AuthService {
 
  constructor(
    private readonly authRepository: IAuthRepository,
    private userService: UserService,
   
  ) {}
  async login(dto: LoginDto, res: Response) {

  }
  async signup(signupDto: SignupDto) {

    const hash =  await argon2.hash(signupDto.password)
    const newUser = new User(signupDto.email,'name',undefined,hash)
    const savedUser =  await this.userService.addUser(newUser)
    return { ok: 'ok'}
   
  }
  
  async getSession(req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>) {
    throw new Error('Method not implemented.');
  }
}
