import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Li Med')
    .setDescription(
      'Li Med is an integrated medical records system powered by AI, designed to assist healthcare providers in making informed decisions. This API provides endpoints for managing patient records, including personal information, medical history, symptoms, diagnoses, treatments, and more.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'swagger',
  });

  await app.listen(port);
}
bootstrap();
