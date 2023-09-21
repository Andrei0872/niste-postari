import { samplePostBody } from "../fixtures";
import { Knex } from "knex";
import * as path from 'path'

export async function seed(knex: Knex) {
  await knex("post").del();

  const userIds = (await knex("user").select('id')).map(r => r.id);

  const posts = Array.from({ length: 60 })
    .map((_, idx) => ({
      title: `title#${idx + 1}`,
      body: samplePostBody,
      image_url: path.join(process.cwd(), 'post_files', 'golden.jpg'),
      poster_id: userIds[idx % 2],
    }));
  await knex("post").insert(posts);
}
