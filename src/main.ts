import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  //activate this when back on frontens
  // app.enableCors({
  //   origin: 'http://localhost:5173', // Your frontend URL
  //   credentials: true,
  // });
  app.useGlobalPipes(new ValidationPipe());
  // need to look into this
  app.use(cookieParser(process.env.COOKIE_SECRET));
  // app.use(cookieParser());
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
