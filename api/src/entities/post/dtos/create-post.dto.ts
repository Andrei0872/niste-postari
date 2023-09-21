import { IsNotEmpty, IsNotEmptyObject, IsString } from "class-validator";

export class CreatePostDTO {
  @IsString()
  title: string;

  @IsString()
  body: string;

  // TODO: how to add `file` in there?
  // Although, there is already some validation in place
  // from `FileValidator`.
}