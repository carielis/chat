import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageGateway } from "./message.gateway";
import { MessageRepository } from "./message.repository";

@Module({
  imports: [TypeOrmModule.forFeature([MessageRepository])],
  providers: [MessageGateway],
})
export class MessageModule {}
