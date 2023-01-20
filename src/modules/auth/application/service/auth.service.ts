
import { UserService } from '../../../user/application/service/user.service';
import { LoginDto, SignupDto } from '../dto';


import { Request, Response } from 'express';
import { IAuthRepository } from '../repository/auth.repository.interface';



export class AuthService {
  getSession(req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>) {
    throw new Error('Method not implemented.');
  }
  signup(dto: SignupDto) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly authRepository: IAuthRepository,
    private userService: UserService,
   
  ) {}
  async login(dto: LoginDto, res: Response) {

  }

 
}
