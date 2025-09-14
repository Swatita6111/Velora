import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, ClientProxyFactory, ClientProxy } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  customerClient.connect()
    .then(() => console.log('Customer-Service: RabbitMQ connected'))
    .catch(err => console.error('Customer-Service: RabbitMQ connection failed', err));

  await app.listen(3001);
  console.log('Customer-Service running on port 3001');
}

bootstrap();
