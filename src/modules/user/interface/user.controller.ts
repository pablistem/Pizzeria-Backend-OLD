import { Application, NextFunction, Request, Response } from "express";

import { IUserRepository } from "../application/repository/user.repository.interface";
import { UserService } from "../application/service/user.service";
import { fromEntityToUserDto } from "../application/mapper/fromEntityToUserDto";
import { UserDto } from "../application/dto/user.dto";
import { fromUserDtoToEntity } from "../application/mapper/fromUserDtoToEntity";
import { Authenticate } from "../../auth/application/guard/auth.guard";


export class UserController {
  baseRoute = "/user";
 
  constructor(
    public userService: UserService,
    public userRepository: IUserRepository,
  ) {}

  configureRoutes(app: Application): void {
    app.get(`${this.baseRoute}`, this.getAllUsers.bind(this));
    app.get(`${this.baseRoute}/:id`, this.getUserById.bind(this));
    app.put(`${this.baseRoute}/:id`, this.updateUser.bind(this));
    app.delete(`${this.baseRoute}/:id`, this.deleteUser.bind(this));
  }



 @Authenticate()
  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    
    try {
    
     console.log(this)
     // const user= await this.userService.getUserById(1)
     // const users = await this.userRepository.getAllUser();
      res.json({ok:'ok'})
    
    } catch (error) {
      next(error);
    }
  }



  async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    try {
      const user = await this.userService.getUserById(Number(id));

      res.json(fromEntityToUserDto(user));
    } catch (error) {
      next(error);
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const { body } = req;

    const userDto = new UserDto({...body, id:id})
    
    try {

      userDto.validate()

      const userUpdated = await this.userService.updateUser(fromUserDtoToEntity(userDto));

      res.json(fromEntityToUserDto(userUpdated));
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    try {
      const userDeleted = await this.userRepository.deleteUser(Number(id));

      res.json({ message: "User deleted" });
    } catch (error) {
      next(error);
    }
  }
}
