import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, ClientProxyFactory, ClientProxy } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3003', // frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Customer Service API')
    .setDescription('Customer management microservice')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // RabbitMQ client for Customer-Service
  const customerClient: ClientProxy = ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'], // your RabbitMQ URL
      queue: 'customer_queue',         // queue this service listens to
      queueOptions: { durable: true },
    },
  });

  // Test RabbitMQ connection
  // customerClient.connect()
  //   .then(() => console.log('Customer-Service: RabbitMQ connected'))
  //   .catch(err => console.error('Customer-Service: RabbitMQ connection failed', err));

  await app.listen(3001);
  console.log('Customer-Service running on port 3001');
}

bootstrap();
