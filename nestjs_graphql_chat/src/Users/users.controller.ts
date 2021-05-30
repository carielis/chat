import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

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
  createUser(@Body() user: { login: string; password: string }) {
    return this.userService.createUser(user);
  }
}
