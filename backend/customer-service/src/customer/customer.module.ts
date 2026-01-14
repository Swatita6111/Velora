import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { RabbitMQProvider } from '../rabbitmq/rabbitmq.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerService, RabbitMQProvider],
  controllers: [CustomerController],
})

export class CustomerModule {}
