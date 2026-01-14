import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, ClientProxyFactory, ClientProxy } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
   app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // <-- this converts strings to numbers automatically
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // access like http://localhost:3000/uploads/filename.jpg
  });

  app.enableCors({
    origin: 'http://localhost:3003', // frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // RabbitMQ client for Product-Order-Service
  const orderClient: ClientProxy = ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'], // your RabbitMQ URL
      queue: 'order_queue',            // queue this service listens to
      queueOptions: { durable: true },
    },
  });

  // Test RabbitMQ connection
  orderClient.connect()
    .then(() => console.log('Product-Order-Service: RabbitMQ connected'))
    .catch(err => console.error('Product-Order-Service: RabbitMQ connection failed', err));

  await app.listen(3002);
  console.log('Product-Order-Service running on port 3002');
}

bootstrap();
