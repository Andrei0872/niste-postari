import { Knex } from "knex"
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from "../../src/auth/config";

export async function seed (knex: Knex) {
  await knex("user").del();

  await knex("user").insert([
    {
      username: "user1",
      password: await bcrypt.hash("pas123", SALT_ROUNDS),
    },
    {
      username: "user2",
      password: await bcrypt.hash("pas123", SALT_ROUNDS),
    }
  ]);
}