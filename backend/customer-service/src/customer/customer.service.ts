import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CustomerService {
  private client: ClientProxy;

  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
  ) {
    // RabbitMQ Client
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'customer_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async createCustomer(data: Partial<Customer>): Promise<Customer> {
    const customer = this.customerRepo.create(data);
    await this.customerRepo.save(customer);

    // Publish event to RabbitMQ
    this.client.emit('customer_created', customer);

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepo.find();
  }

  async findOne(id: number): Promise<Customer | null> {
  return this.customerRepo.findOneBy({ id });
}

}
