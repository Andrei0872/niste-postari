import { Controller, Get, HttpException, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserCookieData } from '../user/user.model';
import { catchError, from, map } from 'rxjs';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/')
  async getAll(@Res() res: Response, @Req() req: Request) {
    return from(this.postService.getAll())
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
}
