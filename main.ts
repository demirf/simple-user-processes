import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/api/modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import ValidationException from './app/api/core/exceptions/validation.exception';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        return new ValidationException(errors);
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
