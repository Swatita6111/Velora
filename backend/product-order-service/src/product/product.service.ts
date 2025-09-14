import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  private client: ClientProxy;

  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'product_queue',
        queueOptions: { durable: false },
      },
    });
  }

  async createProduct(data: Partial<Product>): Promise<Product> {
    const product = this.productRepo.create(data);
    await this.productRepo.save(product);

    // Publish event to RabbitMQ
    this.client.emit('product_created', product);

    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepo.find();
  }

  async findOne(id: number): Promise<Product | null> {
    return this.productRepo.findOneBy({ id });
  }
}
