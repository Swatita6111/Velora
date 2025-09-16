import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { OrderService } from '../order/order.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService,
    private readonly orderService: OrderService,
  ) {}

  @Post('add')
  async addToCart(@Body() body: any) {
    const { customerId, item } = body;
    return this.cartService.addToCart(customerId, item);
  }

  @Get(':customerId')
  async getCart(@Param('customerId') customerId: number) {
    return this.cartService.getCart(customerId);
  }

  @Post('checkout')
  async checkout(@Body() body: any) {
    const { customerId } = body;
    const cart = await this.cartService.getCart(customerId);

    if (!cart || cart.items.length === 0) {
      return { message: 'Cart is empty' };
    }

    const total = cart.items.reduce((sum, item) => sum + item.price, 0);

    const order = await this.orderService.createOrder({
      customerId,
      items: cart.items,
      total,
    });

    await this.cartService.clearCart(customerId);

    return { message: 'Order confirmed!', order };
  }
}
