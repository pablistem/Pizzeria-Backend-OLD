import { Application, Request, Response, NextFunction } from "express";
import { MessageService } from "../application/service/message.service";
import { MessageRepository } from "../infrastructure/message.repository";

export class MessageController {
  baseRout = "/message";

  constructor(
    readonly messageService: MessageService,
    readonly messageRepository: MessageRepository
  ) {}

  configureRoutes(app: Application) {
    app.get(`${this.baseRout}`, () => {});
  }

  async getMessage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    res.json({ message: "This rout is the Polla" });
  }
}
