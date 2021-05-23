/* eslint-disable prettier/prettier */
import { Repository } from "typeorm";
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/Entity/user.entity";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/Auth/jwt-auth.guard";

@Controller("user")
export class UsersController {
  constructor(private userService: UsersService) {}
  // @UseGuards(JwtAuthGuard)
  @Get("all")
  getAllUsers() {
    return this.userService.getAll();
  }

  // @Get("find/:login")
  // getOne(@Param("login") login: string) {
  //   return this.userService.getByLogin(login);
  // }

  @Post("create")
  createUser(@Body() user: any) {
    return this.userService.createUser(user);
  }
}
