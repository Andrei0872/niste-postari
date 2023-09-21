import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_PROVIDER_TOKEN } from 'src/db/db.module';

const logger = new Logger('post.service');

@Injectable()
export class PostService {
  constructor(@Inject(PG_PROVIDER_TOKEN) private pool: Pool) { }
  
  async getAll() {
    const client = await this.pool.connect();
    try {
      const res = await client.query(
        `
          select
            p.id "postId",
            title,
            body,
            image_url "imageUrl",
            u.username,
            u.id "posterId"
          from post p
          join "user" u
            on p.poster_id = u.id
        `,
      );

      return res.rows;
    } catch (err) {
      logger.error(err.message);
      throw new Error('An error occurred while fetching the posts.');
    } finally {
      client.release();
    }
  }
}
