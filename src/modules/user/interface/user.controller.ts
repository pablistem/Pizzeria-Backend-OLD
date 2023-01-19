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
    app.get(`${this.baseRoute}/:id`, this.getOneUser.bind(this));
    app.put(`${this.baseRoute}/:id`, this.updateUser.bind(this));
    app.delete(`${this.baseRoute}/:id`, this.deleteUser.bind(this));
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

  async getOneUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    try {
      const user = await this.userService.getOneUser(Number(id));

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

    try {
      const userUpdated = await this.userService.updateUser(Number(id), body);

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
