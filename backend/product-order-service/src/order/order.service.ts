import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  private client: ClientProxy;

  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'order_queue',
        queueOptions: { durable: false },
      },
    });
  }

  async createOrder(data: Partial<Order>): Promise<Order> {
    const order = this.orderRepo.create(data);
    await this.orderRepo.save(order);

    // Publish event to RabbitMQ
    this.client.emit('order_created', order);

    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find();
  }

  async findOne(id: number):  Promise<Order | null> {
    return this.orderRepo.findOneBy({ id });
  }
}

