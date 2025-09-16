import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { OrdersService } from './order.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Body() body: { customerId: number; productId: number; quantity: number },
  ) {
    return this.ordersService.createOrder(
      body.customerId,
      body.productId,
      body.quantity,
    );
  }

  @Get(':id')
  async getOrder(@Param('id') id: number) {
    return this.ordersService.getOrderById(+id);
  }
  
  // orders.controller.ts
@Get('cart/:productId')
async getProductForCart(@Param('productId') productId: number) {
  return this.ordersService.getProductById(+productId);
}


  @Get('customer/:customerId')
  async getOrdersByCustomer(@Param('customerId') customerId: number) {
    return this.ordersService.getOrdersByCustomer(+customerId);
  }
}
