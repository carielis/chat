/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { UsersService } from "src/Users/users.service";
import * as bcryptjs from "bcryptjs"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async validateUser(user) {
    
    const findUser = await this.userService.getByLogin(user.login);
   
    if(findUser) {
        const {login, password} = findUser
        const checkPassword = bcryptjs.compareSync(user.password, password)
        if(checkPassword) {
            const {password, ...result} = findUser
            return this.login(result)
        }
        throw new HttpException('Bad login', HttpStatus.UNAUTHORIZED)
    }
    throw new HttpException('Bad login', HttpStatus.UNAUTHORIZED)
  }

  async login(user: any) {
    const payload = { username: user.login, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
