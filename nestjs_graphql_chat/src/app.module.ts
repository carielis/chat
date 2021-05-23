import { MessageModule } from "./Message/message.module";
/* eslint-disable prettier/prettier */
import { UsersModule } from "./Users/users.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppService } from "./app.service";

import { AuthModule } from "./Auth/auth.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MessageModule, 
    TypeOrmModule.forRoot({
        url: "postgres://postgres:secret@postgres:5432/stage",
        type: "postgres",
      // host: "localhost",
      // port: 5432,
      // username: "postgres",
      // password: "secret",
      // database: "stage",
        autoLoadEntities: true,
        synchronize: true,
    }),
  ],
  //controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
