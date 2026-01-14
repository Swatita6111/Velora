import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';
import { CreateCustomerDto } from './dto/create-customer.dto';
import * as bcrypt from 'bcrypt';
import { Inject } from '@nestjs/common';

@Injectable()
export class CustomerService {
  // private client: ClientProxy;



  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
    @Inject('RABBITMQ_CLIENT')
    private client: ClientProxy,
  ) {
    // RabbitMQ Client
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'customer_queue',
        queueOptions: { durable: true }, // Durable for production
      },
    });
  }

  async createCustomer(data: CreateCustomerDto): Promise<Customer> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const customer = this.customerRepo.create({
      ...data,
      password: hashedPassword,
    });

    await this.customerRepo.save(customer);

    this.client.emit('customer.created', {
      id: customer.id,
      email: customer.email,
      name: customer.name,
    });

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepo.find();
  }

  async findOne(id: number): Promise<Customer | null> {
    return this.customerRepo.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return this.customerRepo.findOneBy({ email });
  }

}
