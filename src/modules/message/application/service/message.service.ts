import { MessageRepository } from "../../infrastructure/message.repository";

export class MessageService {
  constructor(MessageRepository: MessageRepository) {}
}
