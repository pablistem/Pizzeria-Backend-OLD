import { Application } from "express";
import DIContainer, { IDIContainer } from "rsdi";
import { MessageController } from "./interface/message.controller";
import { MessageService } from "./application/service/message.service";
import { MessageRepository } from "./infrastructure/message.repository";

const initMessageModule = (app: Application, container: DIContainer): void => {
  const messageController: MessageController = (container as IDIContainer).get(
    MessageController
  );
  messageController.configureRoutes(app);
};

export {
  initMessageModule,
  MessageService,
  MessageRepository,
  MessageController,
};
