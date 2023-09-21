import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_PROVIDER_TOKEN } from 'src/db/db.module';
import { RegisterUserDTO } from './dtos/register-user.dto';
import { User } from './user.model';

const TABLE_NAME = `"user"`;

const logger = new Logger('user.service');

@Injectable()
export class UserService {
  constructor(@Inject(PG_PROVIDER_TOKEN) private pool: Pool) { }

  public async insertOne(registerUserDTO: RegisterUserDTO): Promise<User> {
    const client = await this.pool.connect();
    const values = [registerUserDTO.username, registerUserDTO.password];

    try {
      const res = await client.query(
        `
          insert into ${TABLE_NAME} (username, password)
          values ($1, $2)
          returning *
        `,
        values
      );

      return res.rows[0];
    } catch (err) {
      logger.error(err.message);
      throw err;
    } finally {
      client.release();
    }
  }

  async getOneByUsername(username: string): Promise<User> {
    const sqlStr = `
      select
        id,
        username,
        password
      from "user" u
      where u.username = $1;
    `;
    const values = [username];

    const client = await this.pool.connect();
    try {
      const res = await client.query(sqlStr, values);
      return res.rows[0];
    } finally {
      client.release();
    }
  }
}