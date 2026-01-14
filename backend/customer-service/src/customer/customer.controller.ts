import { Controller, Get, Post, Body, Param, BadRequestException } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import * as bcrypt from 'bcrypt';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post()
  async create(@Body() body: CreateCustomerDto) {
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

    if (!customer) {
      throw new BadRequestException('Invalid email or password');
    }

    // Compare plain password with hashed password
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
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
