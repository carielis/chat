import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "src/Users/users.service";
import * as bcryptjs from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "src/Entity/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(user: UserEntity) {
    const findUser = await this.userService.getByLogin(user.login);

    if (findUser) {
      const { password } = findUser;
      const checkPassword = bcryptjs.compareSync(user.password, password);
      if (checkPassword) {
        const { password, ...result } = findUser;
        return this.login(result);
      }
      throw new HttpException("Bad login", HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException("Bad login", HttpStatus.UNAUTHORIZED);
  }

  async login(user: { login: string; id: string }) {
    const payload = { username: user.login, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
