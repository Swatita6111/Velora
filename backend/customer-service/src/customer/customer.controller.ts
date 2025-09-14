import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() body: any) {
    return this.customerService.createCustomer(body);
  }

  @Get()
  async findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.customerService.findOne(id);
  }
}
