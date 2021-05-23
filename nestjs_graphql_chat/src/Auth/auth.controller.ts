import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("login")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  login(@Body() user: any) {
    return this.authService.validateUser(user);
  }
  @UseGuards(JwtAuthGuard)
  @Post("checkMe")
  getProfile(@Request() req) {
    return req.user;
  }
}
