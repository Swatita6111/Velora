import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(
      createOrderDto.customerId,
      createOrderDto.productId,
      createOrderDto.quantity,
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
