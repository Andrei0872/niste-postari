import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SESSION_MIDDLEWARE_TOKEN } from './middlewares/session.middleware';
import { config } from './config';
import * as cors from 'cors';

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  app.setGlobalPrefix('api');

  const sessionMiddleware = app.get(SESSION_MIDDLEWARE_TOKEN);
  app.use(sessionMiddleware);

  app.use(cors({
    origin: config.CLIENT_URL,
    credentials: true,
  }));


  await app.listen(PORT);
}
bootstrap();
