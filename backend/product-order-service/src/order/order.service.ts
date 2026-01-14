import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @Inject('RABBITMQ_SERVICE') 
    private readonly rabbitClient: ClientProxy,
  ) { }

  async createOrder(customerId: number, productId: number, quantity: number) {

    if (!customerId) {
      throw new NotFoundException('Please login'); // or use UnauthorizedException
    }

    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    // Create order (no stock management)
    const order = this.orderRepo.create({ customerId, productId, quantity });
    const savedOrder = await this.orderRepo.save(order);

    // Emit order.created event
    this.rabbitClient.emit('order.created', {
      orderId: savedOrder.id,
      customerId,
      productId,
      quantity,
    });

    return savedOrder;
  }

  async getOrderById(id: number) {
  const order = await this.orderRepo.findOne({ where: { id }, relations: ['product'] });
  if (!order) throw new NotFoundException('Order not found');

  return {
    ...order,
    product: {
      ...order.product,
      image: order.product.image.startsWith("http")
        ? order.product.image
        : `http://localhost:3002/uploads/${order.product.image}`,
    },
  };
}

async getOrdersByCustomer(customerId: number) {
  const orders = await this.orderRepo.find({
    where: { customerId },
    relations: ['product'],
  });

  return orders.map((order) => ({
    ...order,
    product: {
      ...order.product,
      image: order.product.image.startsWith("http")
        ? order.product.image
        : `http://localhost:3002/uploads/${order.product.image}`,
    },
  }));
}


  async getProductById(productId: number) {
  const product = await this.productRepo.findOne({ where: { id: productId } });
  if (!product) throw new NotFoundException('Product not found');
  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `http://localhost:3002/uploads/${product.image}`;

  return {
    ...product,
    image: imageUrl,
  };
}

}
