

import { Application, NextFunction, Request, Response } from 'express';

import { LoginDto, SignupDto } from '../application/dto';
import { AuthService } from '../application/service/auth.service';


export class AuthController {
  baseRoute: string = '/auth'
  constructor(
    private authService: AuthService,
  ) {}

  configureRoutes(app: Application){
    app.post(`${this.baseRoute}/login`, this.login.bind(this));
    app.post(`${this.baseRoute}/signup`, this.signup.bind(this));
 
  }

  async login( req:Request, res: Response , next:NextFunction ) {
     const loginDto =  new LoginDto(req.body)
    try{
      loginDto.validate()
      res.json({ok:'Ok'});
    }
    catch(err){
      next(err)
    }
   
  }

 
  async signup( req:Request, res: Response , next:NextFunction) {
    const signupDto = new SignupDto(req.body)
    try{
      signupDto.validate()
      res.json({ok:'ok'})
    }catch(err){
      next(err)
    }
  }

  
  async getSession( req: Request) {
    const token = await this.authService.getSession(req);
    return token;
  }



}
