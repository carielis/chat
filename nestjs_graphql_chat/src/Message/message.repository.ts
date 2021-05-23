/* eslint-disable prettier/prettier */
import { MessageEntity } from "src/Entity/message.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> {
  async createMessage(data: any): Promise<any> {
    const { send, text } = data;

    const message = this.create()

    message.send_by = send
    message.text_message = text

    await this.save(message)

    return message;
  }
}
