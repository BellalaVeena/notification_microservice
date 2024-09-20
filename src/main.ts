import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as packageJson from '../package.json';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

dotenv.config();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || 'localhost';
  const swaggerOptions = new DocumentBuilder()
    .setTitle(packageJson.name)
    .setDescription(packageJson.description)
    .addServer(`http://${host}:${port}/`)
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api-docs', app, swaggerDocument);
  await app.listen(port);

  const rbtPort = Number(process.env.RABBITMQ_PORT || 5672);
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${host}:${rbtPort}`],
        queue: 'notification-queue',
      },
    });
  microservice.listen();
}
bootstrap();
