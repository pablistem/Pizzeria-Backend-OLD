

import { Application, NextFunction, Request, Response } from 'express';
import { LoginDto, SignupDto } from '../application/dto';
import { InvalidRefreshToken } from '../application/error';

import { AuthService } from '../application/service/auth.service';


export class AuthController {
  baseRoute: string = '/auth'
  constructor(
    private authService: AuthService,
  ) {}

  configureRoutes(app: Application){
    app.post(`${this.baseRoute}/login`, this.login.bind(this));
    app.post(`${this.baseRoute}/signup`, this.signup.bind(this));
    app.post(`${this.baseRoute}/session`, this.refreshSession.bind(this));
    app.get(`${this.baseRoute}/verify/:token`,this.verifyUser.bind(this))
 
  }

  async login( req:Request, res: Response , next:NextFunction ) {
     const loginDto =  new LoginDto(req.body)
    try{
      loginDto.validate()

      const access_token = await this.authService.login(res,loginDto)
      res.json({access_token});
    }
    catch(err){
      next(err)
    }
   
  }


  async signup( req:Request, res: Response , next:NextFunction) {
    const signupDto = new SignupDto(req.body)
    try{
      signupDto.validate()
      await this.authService.signup(signupDto)
      res.status(201).send()
    }catch(err){
      next(err)
    }
  }

  
  async refreshSession( req:Request, res: Response , next:NextFunction ) {
    const cookie = req.headers.cookie
    try {
      if (cookie === undefined) {
        throw new InvalidRefreshToken()
      }
      if (req.body.logout === true) { return await this.logout(req, res, next) }
      const httpOnlyToken: string = cookie?.split('=')[1]

      const newAccesToken = await this.authService.refreshToken(httpOnlyToken, res)

      res.status(200)
      res.json({access_token:newAccesToken})
    } catch (err) {
      next(err)
    }
  }


  async logout (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cookie = req.headers.cookie
      res.clearCookie(String(process.env.HTTPONLY_COOKIE_NAME), { httpOnly: true, secure: true, path: '/auth/session' })

      const httpOnlyToken = cookie?.split('=')[1]

      await this.authService.logout(httpOnlyToken as string)

      res.status(200)
      res.send()
    } catch (err) {
      next(err)
    }
  }


  async verifyUser(req: Request, res: Response, next: NextFunction){


    const {token} = req.params

    try {
  
      await this.authService.verifyUser(token)
      
      res.status(201)
      res.send()
    } catch (err) {
      next(err)
    }

  }

}
