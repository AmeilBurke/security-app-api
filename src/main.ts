import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(
      'C:\\Users\\Ameil\\Documents\\Certificates\\ilt security app\\192.168.1.65-key.pem',
    ),
    cert: fs.readFileSync(
      "C:\\Users\\Ameil\\Documents\\Certificates\\ilt security app\\192.168.1.65.pem",
    ),
  };
  
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.enableCors({
    origin: [
      'https://localhost:5173',
      'https://192.168.1.65:5173',
    ],
    credentials: true,
    methods: 'GET,POST,PUT,DELETE',
  });

  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });
  
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser(process.env.COOKIE_SECRET));

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
