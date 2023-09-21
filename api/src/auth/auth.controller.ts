import { Body, Controller, HttpException, HttpStatus, Post, Req, Res, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from 'src/entities/user/dtos/register-user.dto';
import { getPublicUser } from 'src/entities/user/user.model';
import { Response, Request } from 'express';
import { LoginUserDTO } from 'src/entities/user/dtos/login-user.dto';

@SetMetadata('skipAuth', true)
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

  @Post('login')
  async login(@Body() loginUserDTO: LoginUserDTO, @Res() res: Response, @Req() req: Request) {
    try {
      const user = await this.authService.login(loginUserDTO);

      (req as any).session.user = this.authService.getUserCookieFields(user);

      return res
        .status(HttpStatus.CREATED)
        .json({
          data: getPublicUser(user),
          message: 'User logged in successfully.'
        })
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }
}
