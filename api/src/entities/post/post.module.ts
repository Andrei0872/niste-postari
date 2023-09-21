import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path'
import * as multer from 'multer';
import * as crypto from 'crypto'

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), 'post_files'),
  filename(req, file, callback) {
    const randomChars = crypto.randomBytes(18).toString('hex');
    const fileName = `${randomChars}${path.extname(file.originalname)}`

    callback(null, fileName);
  },
})

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    MulterModule.register({
      storage,
    })
  ]
})
export class PostModule { }
