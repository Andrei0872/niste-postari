import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SESSION_MIDDLEWARE_PROVIDER } from './middlewares/session.middleware';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    DbModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SESSION_MIDDLEWARE_PROVIDER,
  ],
})
export class AppModule {}
