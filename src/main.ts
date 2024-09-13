import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //!seteo el prefijo api a mis endpoints de manera global
  app.setGlobalPrefix('api/v2');

  //!configuro los pipes de validacion de forma global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      
      //hace la conversion implicita de los queryParameters segun en DTO que se defina
      transform:true,
      transformOptions:{
        enableImplicitConversion:true
      }

    })
  );

  //await app.listen(3000);
  await app.listen(process.env.PORT);
  console.log(`App running on Port ${process.env.PORT}`);
  
}
bootstrap();
