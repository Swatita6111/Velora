import { Controller, Get, Post, Body, Param, BadRequestException } from '@nestjs/common';
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

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const customer = await this.customerService.findByEmail(email);

    if (!customer || customer.password !== password) {
      throw new BadRequestException('Invalid email or password');
    }

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      message: 'Login successful',
    };
  }
}
