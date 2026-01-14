import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @Type(() => Number) // converts string to number
  customerId: number;

  @IsNumber()
  @Type(() => Number)
  productId: number;

  @IsNumber()
  @Type(() => Number)
  quantity: number;
}
