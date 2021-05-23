/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/Entity/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs"
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>
  ) {}

  getAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }
  
  async getByLogin(login) : Promise<UserEntity> {
    return this.repository.findOne({login})
  }

  async createUser(user) : Promise<any> {
    const {login, password} = user
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password,salt)
    const checkOnReservedLogin = await this.repository.findOne({login})
    if (!checkOnReservedLogin) {
      const create = this.repository.create({login,password: hashPassword})
      return this.repository.save(create)
    }
    throw new HttpException('Login reserved', HttpStatus.BAD_REQUEST)
  }

}
