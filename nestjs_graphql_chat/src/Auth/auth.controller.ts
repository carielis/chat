import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { UserEntity } from "src/Entity/user.entity";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("login")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  login(@Body() user: UserEntity) {
    return this.authService.validateUser(user);
  }
  @UseGuards(JwtAuthGuard)
  @Post("checkMe")
  getProfile(@Request() req) {
    return req.user;
  }
}
