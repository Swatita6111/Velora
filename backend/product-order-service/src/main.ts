import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, ClientProxyFactory, ClientProxy } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
