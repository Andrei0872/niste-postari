import { samplePostBody } from "../fixtures";
import { Knex } from "knex";
import * as path from 'path'

export async function seed(knex: Knex) {
  await knex("post").del();

  const userIds = (await knex("user").select('id')).map(r => r.id);
  
  await knex("post").insert([
    {
      title: 'title#1',
      body: samplePostBody,
      image_url: path.join(process.cwd(), 'post_files', 'golden.jpg'),
      poster_id: userIds[0],
    },
    {
      title: 'title#2',
      body: samplePostBody,
      image_url: path.join(process.cwd(), 'post_files', 'golden.jpg'),
      poster_id: userIds[0],
    },
    {
      title: 'title#3',
      body: samplePostBody,
      image_url: path.join(process.cwd(), 'post_files', 'golden.jpg'),
      poster_id: userIds[1],
    },
    {
      title: 'title#4',
      body: samplePostBody,
      image_url: path.join(process.cwd(), 'post_files', 'golden.jpg'),
      poster_id: userIds[1],
    },
  ]);
}
