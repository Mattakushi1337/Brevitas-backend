import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('How to work')
    .setDescription('Info')
    .setVersion('1.0')
    .addTag('Work')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.use(cookieParser())
  app.enableCors();
  await app.listen(3000);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
}
bootstrap();
