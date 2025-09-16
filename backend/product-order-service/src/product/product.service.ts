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

    // ensure full URL for image if provided
    if (product.image && !product.image.startsWith('http')) {
      product.image = `http://localhost:3002/uploads/${product.image}`;
    }

    await this.productRepo.save(product);

    // Publish event to RabbitMQ
    this.client.emit('product_created', product);

    return product;
  }


  async findAll(): Promise<Product[]> {
  const products = await this.productRepo.find();
  return products.map(p => ({
    ...p,
    image: p.image && !p.image.startsWith('http')
      ? `http://localhost:3002/uploads/${p.image}`
      : p.image,
  }));
}

async findOne(id: number): Promise<Product | null> {
  const product = await this.productRepo.findOneBy({ id });
  if (!product) return null;

  if (product.image && !product.image.startsWith('http')) {
    product.image = `http://localhost:3002/uploads/${product.image}`;
  }
  return product;
}

}
