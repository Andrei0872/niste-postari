import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SESSION_MIDDLEWARE_PROVIDER } from './middlewares/session.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SESSION_MIDDLEWARE_PROVIDER,
  ],
})
export class AppModule {}
