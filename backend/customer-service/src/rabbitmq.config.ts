import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const rabbitMQClient = ClientProxyFactory.create({
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:5672'], // RabbitMQ URL
    queue: 'customer_queue',
    queueOptions: {
      durable: false,
    },
  },
});
