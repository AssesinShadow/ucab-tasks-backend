import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Activamos validación global (para que funcionen los DTOs)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina datos que no estén en el DTO
    forbidNonWhitelisted: true, // Lanza error si envían datos extra
  }));

  // 2. Configuración de Swagger (Documentación)
  const config = new DocumentBuilder()
    .setTitle('UCAB Tasks API')
    .setDescription('API para gestión de notas - Tópicos Especiales de Programación')
    .setVersion('1.0')
    .addTag('notes')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger documentation at: ${await app.getUrl()}/api`);
}
bootstrap();
