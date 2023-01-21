import { Application, NextFunction, Request, Response } from "express";
import { IUserRepository } from "../application/repository/user.repository.interface";
import { UserService } from "../application/service/user.service";
import { fromEntityToUserDto } from "../application/mapper/fromEntityToUserDto";

export class UserController {
  baseRoute = "/user";
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: IUserRepository
  ) {}

  configureRoutes(app: Application): void {
    app.get(`${this.baseRoute}`, this.getAllUsers.bind(this));
    //app.post(`${this.baseRoute}`, this.addUser.bind(this));
    app.get(`${this.baseRoute}/id/:id`, this.getUserById.bind(this));
    app.get(`${this.baseRoute}/email/:email`, this.getUserByEmail.bind(this));
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

  async getUserByEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email } = req.params;

    try {
      const user = await this.userService.getUserByEmail(email);

      res.json(fromEntityToUserDto(user));
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
      await this.userService.deleteUser(Number(id));

      res.json({ message: "User deleted" });
    } catch (error) {
      next(error);
    }
  }
}
