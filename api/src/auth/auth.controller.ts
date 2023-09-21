import { Body, Controller, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from 'src/entities/user/dtos/register-user.dto';
import { getPublicUser } from 'src/entities/user/user.model';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Body() registerUserDTO: RegisterUserDTO, @Res() res: Response, @Req() req: Request) {
    try {
      const user = await this.authService.register(registerUserDTO);

      (req as any).session.user = this.authService.getUserCookieFields(user);

      return res
        .status(HttpStatus.CREATED)
        .json({
          message: 'User successfully registered.',
          data: getPublicUser(user),
        });
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }

}