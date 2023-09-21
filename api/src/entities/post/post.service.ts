import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_PROVIDER_TOKEN } from 'src/db/db.module';
import { CreatePostData, GetAllPostsQueryParams } from './post.model';

const logger = new Logger('post.service');

@Injectable()
export class PostService {
  constructor(@Inject(PG_PROVIDER_TOKEN) private pool: Pool) { }

  // TODO: this logic here really needs to be tested :).
  async getAll(opts: GetAllPostsQueryParams) {
    const query = `
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
      ${
        opts.last_saw_id
          ? `where p.id > $2`
          : ''
      }
      order by p.id asc
      limit $1
    `;
    const values = [
      opts.per_page || 15,
    ];

    if (opts.last_saw_id) {
      values.push(opts.last_saw_id);
    }

    const client = await this.pool.connect();
    try {
      const res = await client.query(query, values);

      return res.rows;
    } catch (err) {
      logger.error(err.message);
      throw new Error('An error occurred while fetching the posts.');
    } finally {
      client.release();
    }
  }

  async createPost(data: CreatePostData) {
    const query = `
      insert into post (title, body, image_url, poster_id)
      values ($1, $2, $3, $4)
      returning *
    `;
    const values = [
      data.title,
      data.body,
      data.image_url,
      data.poster_id,
    ];

    const client = await this.pool.connect();
    try {
      const res = await client.query(query, values);

      return res.rows[0];
    } catch (err) {
      logger.error(err.message);
      throw new Error('An error occurred while creating the post.');
    } finally {
      client.release();
    }
  }
}
