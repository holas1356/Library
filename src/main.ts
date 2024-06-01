import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1"); 
  await app.listen(3000);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  
  const config = new DocumentBuilder()
    .setTitle('Library_PRO API')
    .setDescription(
      'This project is a RESTful API developed with NestJS that allows the management of authors, books, clients and sales. The API is designed following REST conventions and is documented using Swagger.',
    )
    .setVersion('1.0')
    .addTag('library')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);


  
  console.log(` Application is running on: http://localhost:3000/api/v1`);
  
}

bootstrap();



