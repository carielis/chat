/* eslint-disable prettier/prettier */
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  MessageBody,
} from "@nestjs/websockets";
import { Body, Logger, Request, UseGuards, ValidationPipe } from "@nestjs/common";
import { Server } from "socket.io";
import { MessageEntity } from "src/Entity/message.entity";
import { JwtAuthGuard } from "src/Auth/jwt-auth.guard";
import { MessageRepository } from "./message.repository";

@WebSocketGateway(4001, {transports: ["websocket"]})
export class MessageGateway
  implements OnGatewayConnection{

    constructor(
        private repository : MessageRepository,
    ) {}

    @WebSocketServer()
    server: Server;

  
    async handleConnection() {
        const messages = await this.getMessages();
        this.server.emit('init', messages);
      
      }

      
      @SubscribeMessage('create')
      async createMessage( @Body(ValidationPipe) @MessageBody() data: any,
      ) {
            
            await this.repository.createMessage({send: data.send, text: data.text})
            const messages = await this.getMessages()
            this.server.emit('init', messages);
      }

      
      async getMessages(): Promise<MessageEntity[]> {
          const messages = await this.repository.find()
          return await messages.map(message => {
              return message
          })
      }
}
