import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SESSION_MIDDLEWARE_PROVIDER } from './middlewares/session.middleware';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { UserModule } from './entities/user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './entities/post/post.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticateGuard } from './guards/authenticate.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    DbModule,
    UserModule,
    AuthModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SESSION_MIDDLEWARE_PROVIDER,
    {
      provide: APP_GUARD,
      useClass: AuthenticateGuard,
    },
  ],
})
export class AppModule {}
