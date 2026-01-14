import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const RabbitMQProvider = {
  provide: 'RABBITMQ_CLIENT',
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'customer_queue',
        queueOptions: { durable: true },
      },
    }),
};
