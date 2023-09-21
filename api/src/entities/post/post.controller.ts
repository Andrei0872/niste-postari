import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserCookieData } from '../user/user.model';
import { catchError, from, map } from 'rxjs';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDTO } from './dtos/create-post.dto';
import { CreatePostData, GetAllPostsQueryParams } from './post.model';


@Controller('post')
export class PostController {
  constructor(private postService: PostService) { }

  @Get('/')
  async getAll(
    @Res() res: Response,
    @Req() req: Request,
    @Query() query: GetAllPostsQueryParams,
  ) {
    return from(this.postService.getAll(query))
      .pipe(
        map(posts => res.status(HttpStatus.OK).json({
          message: 'The posts have been fetched successfully.',
          data: posts
        })),
        catchError((err) => {
          throw new HttpException(err.message, err.status || HttpStatus.BAD_REQUEST);
        })
      )
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePostDTO,
    @Res() res: Response,
    @Req() req: Request
  ) {
    const user = (req as any).session.user as UserCookieData;

    const createPostData: CreatePostData = {
      title: body.title,
      body: body.body,
      image_url: file.path,
      poster_id: user.id,
    };
    return from(this.postService.createPost(createPostData))
      .pipe(
        map(createdPost => res.status(HttpStatus.OK).json({
          message: 'The post has been successfully created.',
          data: createdPost
        })),
        catchError((err) => {
          throw new HttpException(err.message, err.status || HttpStatus.BAD_REQUEST);
        })
      )
  }
}
