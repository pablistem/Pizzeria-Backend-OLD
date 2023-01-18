import { Application, NextFunction, Request, Response } from "express";
import { newUserDto } from "../application/dto/newUser.dto";
import { IUserRepository } from "../application/repository/user.repository.interface";
import { UserService } from "../application/service/user.service";
import { UserRepository } from "../infrastructure/user.repository";
import { fromNewUserDtoToEntity } from "../application/mapper/fromNewUserDtoToEntity";
import { fromEntityToUserDto } from "../application/mapper/fromEntityToUserDto";

export class UserController {
  baseRoute = "/user";
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: IUserRepository
  ) {}

  configureRoutes(app: Application): void {
    app.get(`${this.baseRoute}`, this.getAllUsers.bind(this));
    app.post(`${this.baseRoute}`, this.addUser.bind(this));
  }

  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const users = await this.userRepository.getAllUser();

    const result = users?.map((user) => fromEntityToUserDto(user));

    try {
      res.json({ users: result });
    } catch (error) {
      next(error);
    }
  }

  async addUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name, email, hash } = req.body;

    const user = { name, email, hash };

    try {
      const userDto = new newUserDto(user);
      userDto.validate();

      const savedUser = await this.userService.addUser(
        fromNewUserDtoToEntity(userDto)
      );

      res.json(fromEntityToUserDto(savedUser));
    } catch (error) {
      next(error);
    }
  }
}
