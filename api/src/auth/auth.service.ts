import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_PROVIDER_TOKEN } from 'src/db/db.module';
import { RegisterUserDTO } from 'src/entities/user/dtos/register-user.dto';
import { UserService } from 'src/entities/user/user.service';

import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './config';
import { PublicUser, UserCookieData } from 'src/entities/user/user.model';
import { LoginUserDTO } from 'src/entities/user/dtos/login-user.dto';
import { InvalidCredentialsError } from './errors/invalid-credentials.error';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PG_PROVIDER_TOKEN) pool: Pool,
    private userService: UserService,
  ) { }

  public async register(registerUserDTO: RegisterUserDTO) {
    try {
      registerUserDTO.password = await this.hashPassword(registerUserDTO.password);
      return await this.userService.insertOne(registerUserDTO);
    } catch (err) {
      throw new Error('An error occurred while registering the user.');
    }
  }

  public async login(loginUserDTO: LoginUserDTO) {
    const user = await this.userService.getOneByUsername(loginUserDTO.username);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doPasswordsMatch = await bcrypt.compare(loginUserDTO.password, user.password);
    if (!doPasswordsMatch) {
      throw new InvalidCredentialsError();
    }

    return user;
  }

  public getUserCookieFields(u: PublicUser): UserCookieData {
    return {
      id: u.id,
      username: u.username,
    };
  }

  private async hashPassword(rawPass: string) {
    const hash = await bcrypt.hash(rawPass, SALT_ROUNDS);
    return hash;
  }
}
